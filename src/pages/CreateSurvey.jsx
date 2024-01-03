import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import moment from "moment";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import { addDoc } from "firebase/firestore";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { authState } from "@/states"
import { surveysRef } from "@/config/firebase";
import useSchoolData from '@/hooks/useSchoolData';
import { FilePlus } from "lucide-react";
import { FilePlus2 } from "lucide-react";
import clsx from "clsx";

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
  surveyName: z.string().min(1, "Survey name can't be empty").min(3, "Survey name can't be less than 3 characters"),
  totalStudents: z.string().min(1, "Total Students can't be empty"),
  expiryDate: z.string().min(1, "Survey date can't be empty"),
  neverExpires: z.boolean()
})

const CreateSurvey = () => {
  const [isSurveyExpiring, setIsSurveyExpiring] = useState(false);
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      neverExpires: false,
      expiryDate: moment().format("YYYY-MM-DD")
    }
  });

  const handleCreateSurvey = (data) => {
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
      : payload.expiry = data.expiryDate

    addDoc(surveysRef, payload).then(value => {
      navigate("/dashboard/surveys")
      reset()
      setIsSurveyExpiring(false)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="w-full">
      {isLoading && <p>Loading...</p>}

      {!isLoading && schoolData ?
        <Fragment>
          <p className="text-xl font-bold text-accent_primary">Create Survey</p>

          <div className="bg-transparent rounded-xl h-[30rem] w-full mt-4 mb-14 flex flex-col relative">
            <form onSubmit={handleSubmit(handleCreateSurvey)} className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Survey Name
                  </label>

                  <p className="text-gray-600">What is the name of your Survey?</p>

                  <input
                    type="text"
                    id="surveyName"
                    {...register("surveyName")}
                    className="border-[#EBEBEB] bg-white border-2 h-[40px] w-full rounded-md focus:border-0 text-sm"
                  />

                  {errors.surveyName && (
                    <p className="text-sm text-error">{errors.surveyName.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="font-semibold">
                    Total Expected Students (around)
                  </label>

                  <p className="text-gray-600">How many students are expected in this survey? (around)</p>

                  <input
                    type="text"
                    id="totalStudents"
                    {...register("totalStudents")}
                    className="border-[#EBEBEB] bg-white border-2 h-[40px] w-full rounded-md focus:border-0 text-sm"
                  />

                  {errors.totalStudents && (
                    <p className="text-sm text-error">{errors.totalStudents.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Expiry Date
                </label>

                <p className="text-gray-600">When does the Campaign End?</p>

                {isSurveyExpiring && (
                  <Fragment>
                    <label htmlFor="expiryDate" className="relative flex items-center justify-center">
                      <input
                        type="date"
                        id="expiryDate"
                        {...register("expiryDate")}
                        min={moment().format("YYYY-MM-DD")}
                        className="border-[#EBEBEB] bg-white border-2 h-[40px] w-full rounded-md focus:border-0 text-sm"
                      />

                      <CalendarIcon className="absolute right-0 w-5 mr-3" />
                    </label>

                    {errors.expiryDate && (
                      <p className="text-sm text-error">{errors.expiryDate.message}</p>
                    )}
                  </Fragment>
                )}

                <div className="flex items-center gap-2 mb-6">
                  <input {...register("neverExpires")} id="never-expire" type="checkbox" defaultChecked={true} onChange={handleClick} className="rounded text-accent_primary ring-0 outline-0 focus:ring-0" />

                  <label htmlFor="never-expire" className="font-medium"  >
                    This survey never expires
                  </label>
                </div>

                <div className="flex flex-col w-full gap-2 mb-6">
                  <label htmlFor="" className="font-semibold">
                    Included Subjects
                  </label>

                  <p className="text-gray-600">Which subjects should be included in this survey?</p>

                  <div>
                    <FormControl className="w-full" >
                      <InputLabel id="multiple-subjects-label">Subjects</InputLabel>

                      <Select
                        labelId="multiple-subjects-label"
                        id="multiple-subjects"
                        color="primary"
                        multiple
                        required
                        value={subjects}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Subjects" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} sx={{ background: "white", border: "1px solid #ebebeb" }} />
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

              <div className={clsx("absolute mb-4 right-0", !isSurveyExpiring ? "-bottom-[3rem]" : "-bottom-[6rem]")}>
                <div className="flex gap-4">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="px-6 py-2 text-sm font-semibold transition rounded-md hover:bg-slate-200"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-md bg-accent_primary px-6 py-2 text-sm font-semibold leading-6 text-accent_secondary shadow-md hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out"
                  >
                    Create Survey

                    <FilePlus2 className="w-5 h-5 ml-3" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
        : null}
    </div>
  );
};

export default CreateSurvey;
