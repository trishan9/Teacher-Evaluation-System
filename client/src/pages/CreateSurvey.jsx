import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useRecoilState } from "recoil";
import { FilePlus2, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { addDoc } from "firebase/firestore";
import { format } from "date-fns"

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { cn } from "@/lib/utils";
import { authState } from "@/states"
import { surveysRef } from "@/config/firebase";
import useSchoolData from '@/hooks/useSchoolData';
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl as FormControlShadCN,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";


// -------------------------MUI CONFIGS AND FUNCTIONS-------------------------
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, subjects, theme) {
  return {
    fontWeight:
      subjects.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// -------------------------MUI CONFIGS AND FUNCTIONS-------------------------

// Zod Schema
const formSchema = z.object({
  surveyName: z.string({ required_error: "Survey name can't be empty" }).min(1, "Survey name can't be empty").min(3, "Survey name can't be less than 3 characters"),
  totalStudents: z.string({ required_error: "Total Students can't be empty" }).min(1, "Total Students can't be empty"),
  expiryDate: z.date({ required_error: "Expiry Date can't be empty" }),
  neverExpires: z.boolean(),
})

const CreateSurvey = () => {
  const [isSurveyExpiring, setIsSurveyExpiring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [authUser] = useRecoilState(authState)

  const { schoolData, isLoading } = useSchoolData();
  const navigate = useNavigate()
  const theme = useTheme();

  useEffect(() => {
    if (schoolData) {
      setSubjects(schoolData.subjects)
    }
  }, [schoolData])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSubjects(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClick = () => {
    setIsSurveyExpiring((prevState) => !prevState);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      neverExpires: !isSurveyExpiring,
      expiryDate: new Date(+new Date() + 86400000 * 2)
    },
  })

  const { isValid } = form.formState

  const { toast } = useToast()

  const handleCreateSurvey = async (data) => {
    try {
      setIsSubmitting(true)
      const surveyId = `${authUser.email.replace("@trs.com", "")}-${uuidv4().slice(0, 8)}`
      const uri = `/participate/${surveyId}`

      const payload = {
        name: data.surveyName,
        totalStudents: data.totalStudents,
        participants: [],
        subjects,
        surveyId,
        uri,
        user: {
          email: authUser.email,
          id: authUser.id
        },
        status: "ACTIVE"
      }
      data.neverExpires == true
        ? payload.expiry = "NEVER"
        : payload.expiry = format(data.expiryDate, "PPP")

      await addDoc(surveysRef, payload)
      toast({
        title: "Survey Created!",
        description: `${payload.name} has been created succesfully!`
      })
      navigate("/dashboard/surveys")
      reset()
      setIsSurveyExpiring(false)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full">
      {isLoading && <p>Loading...</p>}

      {isSubmitting &&
        <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-5xl bg-slate-100/70">
          <Loader2 className="w-12 h-12 animate-spin" />
        </div>
      }

      {!isLoading && schoolData ?
        <Fragment>
          <p className="text-xl font-bold text-accent_primary">Create Survey</p>

          <div className="bg-transparent rounded-xl h-[30rem] w-full mt-6 lg:mt-12 mb-80 lg:mb-28 flex flex-col relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateSurvey)} className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="surveyName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="text-base font-semibold">Survey Name</FormLabel>

                        <FormControlShadCN>
                          <Input placeholder="e.g. First Terminal Survey" {...field} />
                        </FormControlShadCN>

                        <FormDescription>
                          This is your public survey name.
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalStudents"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="text-base font-semibold">Total Expected Students (around)</FormLabel>

                        <FormControlShadCN>
                          <Input placeholder="e.g. 45" {...field} />
                        </FormControlShadCN>

                        <FormDescription>
                          How many students are expected in this survey?
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="text-base font-semibold">Expiry Date</FormLabel>

                        {isSurveyExpiring && <Popover>
                          <PopoverTrigger asChild>
                            <FormControlShadCN>
                              <Button
                                type="button"
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}

                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControlShadCN>
                          </PopoverTrigger>

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              className="font-primary"
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <= new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>}

                        <FormDescription>
                          When does the Survey End?
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="neverExpires"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start p-4 mt-4 space-x-3 space-y-0 bg-white border rounded-md">
                        <FormControlShadCN>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            onClick={handleClick}
                          />
                        </FormControlShadCN>

                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            This survey never expires
                          </FormLabel>

                          <FormDescription>
                            By checking this, the survey will never expire, and to end/terminate the survey you have to perform it manually by going to it's dashboard.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col w-full gap-1 my-6">
                    <label className="font-semibold">
                      Included Subjects
                    </label>

                    <p className="mt-1 text-sm text-muted-foreground">Which subjects should be included in this survey?</p>

                    <div className="mt-4">
                      <FormControl className="w-full" >
                        <InputLabel id="multiple-subjects-label" sx={{ color: "#64748b" }}>Subjects</InputLabel>

                        <Select
                          labelId="multiple-subjects-label"
                          id="multiple-subjects"
                          color="primary"
                          multiple
                          required
                          value={subjects}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Subjee" sx={{ background: "white", border: "1px solid #e2e8f0" }} />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} sx={{ background: "white", border: "1px solid #ebebeb", color: "#000000" }} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {schoolData.subjects.map((subject) => (
                            <MenuItem
                              key={subject}
                              value={subject}
                              style={getStyles(subject, subjects, theme)}
                            >
                              {subject}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>

                <div className={cn("absolute mb-4 right-0", !isSurveyExpiring ? "lg:-bottom-[6.5rem] -bottom-[18.5rem]" : "lg:-bottom-[9.5rem] -bottom-[21.5rem]")}>
                  <div className="flex gap-4">
                    <button
                      onClick={() => reset()}
                      disabled={isSubmitting}
                      type="button"
                      className="px-6 py-2 text-sm font-semibold transition rounded-md disabled:opacity-75 hover:bg-slate-200 disabled:bg-transparent disabled:cursor-not-allowed"
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className="flex items-center justify-center rounded-md bg-accent_primary px-6 py-2 text-sm font-semibold leading-6 text-accent_secondary shadow-md hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out disabled:opacity-70 disabled:hover:bg-accent_primary disabled:cursor-not-allowed"
                    >
                      Create Survey

                      <FilePlus2 className="w-5 h-5 ml-3" />
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </Fragment>
        : null}
    </div>
  );
};

export default CreateSurvey;
