import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useSchoolData } from "@/hooks";
import { authState } from "@/states";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const BASE_URL = import.meta.env.VITE_API_URL;

const Surveys = () => {
  const { schoolData, isLoading } = useSchoolData();

  const [authUser] = useRecoilState(authState);
  const [activeSurveys, setActiveSurveys] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [isEditLoading, setIsEditLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [newName, setNewName] = useState("")

  const { toast } = useToast();
  const navigate = useNavigate()

  useEffect(() => {
    const filteredActiveSurveys = schoolData?.data?.data.surveys?.filter(
      (survey) => survey.status === "ACTIVE"
    );
    setActiveSurveys(filteredActiveSurveys);

    const expiredSurveys = filteredActiveSurveys?.filter((survey) => {
      const expiryDate = survey.expiry;
      if (expiryDate && expiryDate != "NEVER") {
        const today = new Date(moment().format("YYYY-MM-DD"));
        const expiry = new Date(expiryDate);
        const diff = expiry - today;
        return diff <= 0;
      }
    });

    if (expiredSurveys?.length) {
      expiredSurveys.map((survey) => {
        axios
          .patch(
            `${BASE_URL}/survey/${survey.id}`,
            {
              status: "EXPIRED",
            },
            {
              headers: {
                Authorization: `Bearer ${authUser.email}`,
              },
            }
          )
          .then(() => {
            navigate(0);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [schoolData]);

  const onNameUpdate = async (id) => {
    try {
      setIsEditLoading(true)
      await axios.patch(`${BASE_URL}/survey/${id}`,
        {
          name: newName
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.email}`,
          },
        });
      setIsEditing(false)
      setEditingId(null)
      toast({
        title: "Survey Updated!",
        description: `Survey name has been changed succesfully!`
      })
      navigate(0)
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsEditLoading(false)
    }
  }

  const handleDeleteSurvey = async (id) => {
    const filteredSurveys = activeSurveys.filter((survey) => survey.id != id);
    setActiveSurveys(filteredSurveys);

    try {
      await axios.delete(`${BASE_URL}/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser.email}`,
        },
      });
    } catch {
      setActiveSurveys(activeSurveys);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="w-full">
      <p className="text-xl font-bold text-accent_primary">Surveys</p>

      {isLoading && <p> Loading...</p>}

      {activeSurveys?.length == 0 && !isLoading && <p>No any Surveys</p>}

      <div className="flex flex-col gap-6 my-2">
        <div className="px-6">
          <div className="flow-root mt-4">
            <div className="-mx-8 -my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-2 pl-2 align-middle sm:pr-6 lg:pr-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <tbody className="divide-y divide-gray-200">
                    {!isLoading &&
                      activeSurveys &&
                      activeSurveys.map((data) => (
                        <tr key={data.id} className="flex items-start justify-between">
                          <td className={cn("flex flex-col gap-2 py-[22px] pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0",
                            isEditing && editingId === data.id ? "w-[45%]" : "w-[25%]")
                          } >
                            <div className="flex items-center gap-2">
                              <p className="text-light-text-secondary">
                                Survey Name
                              </p>

                              {editingId !== data.id &&
                                <Pencil className="w-3 cursor-pointer"
                                  onClick={() => {
                                    setEditingId(data.id)
                                    setIsEditing(true)
                                  }}
                                />
                              }
                            </div>

                            {editingId !== data.id && <p className="text-base font-semibold">
                              {data.name}
                            </p>}

                            {isEditing && editingId === data.id &&
                              <div className="flex flex-col items-start gap-2">
                                <Input className="w-44 sm:w-80" defaultValue={data.name} onChange={(e) => setNewName(e.target.value)} />

                                <div className="flex items-stretch gap-2">
                                  <Button size="sm" className="py-1" onClick={() => onNameUpdate(data.id)}>
                                    Save

                                    {isEditLoading && <Loader2 className="w-4 ml-2 animate-spin" />}
                                  </Button>

                                  <Button size="sm" variant="outline" className="py-1" onClick={() => {
                                    setIsEditing(false)
                                    setEditingId(null)
                                  }
                                  }>
                                    Cancel
                                  </Button>
                                </div>

                              </div>}

                          </td>

                          <td className=" font-semibold flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap w-[25%]">
                            <p className="text-light-text-secondary">
                              Total Participants
                            </p>

                            <p className="text-base font-semibold">
                              {data.participantDetails?.length ?? 0}
                            </p>
                          </td>

                          <td className="flex flex-col items-center justify-center gap-2 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap w-[25%]">
                            <p className="font-semibold text-light-text-secondary">
                              Expire on
                            </p>

                            <p className="text-base font-semibold">
                              {data.expiry}
                            </p>
                          </td>

                          <td className="flex items-center gap-3 px-3 py-[22px] text-sm text-gray-500 whitespace-nowrap">
                            <Link
                              id={data.surveyId}
                              to={`/dashboard/survey/${data.surveyId}`}
                            >
                              <button className="flex items-center justify-center h-10 gap-2 px-4 font-semibold bg-white border rounded-md hover:bg-gray-100 btn-filled-white bg-brand-white text-light-text-primary border-light-border disabled:opacity-50">
                                Dashboard
                              </button>
                            </Link>

                            <ReactTooltip
                              className="!max-w-[22rem] !bg-black !py-2 !px-3"
                              anchorSelect={`#${data.surveyId}`}
                              place="bottom"
                            >
                              <p className="text-xs">
                                {data && data.name && `${data.name} Dashboard`}
                              </p>
                            </ReactTooltip>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="bg-white w-10 h-10 flex items-center justify-center hover:bg-gray-100 hover:border-error !font-normal bg-brand-white text-light-text-primary rounded-md border border-light-border">
                                  <Trash2 className="w-5 text-error" />
                                </button>
                              </AlertDialogTrigger>

                              <AlertDialogContent className="font-primary">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your survey and remove
                                    your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteSurvey(data.id)}
                                  >
                                    Delete
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;
