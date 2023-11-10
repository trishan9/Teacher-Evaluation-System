import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import moment from "moment";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { authState } from "@/states"
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import { surveysRef } from "@/config/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  surveyName: z.string().min(1, "Survey name can't be empty").min(3, "Survey name can't be less than 3 characters"),
  expiryDate: z.string().min(1, "Survey date can't be empty"),
  neverExpires: z.boolean()
})

const CreateSurvey = () => {
  const [isSurveyExpiring, setIsSurveyExpiring] = useState(false);
  const [authUser] = useRecoilState(authState)
  const navigate = useNavigate()

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
      participants: [],
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
      <p className="text-xl font-bold">Create Survey</p>

      <div className="bg-white rounded-xl shadow-sm min-h-[45vh] w-full p-6  my-6 flex flex-col relative">
        <form onSubmit={handleSubmit(handleCreateSurvey)} className="grid grid-cols-1 gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Survey Name
            </label>

            <p className="text-gray-600">What is the name of your Survey?</p>

            <input
              type="text"
              id="surveyName"
              {...register("surveyName")}
              className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border"
            />

            {errors.surveyName && (
              <p className="text-sm text-error">{errors.surveyName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold">
              Expiry Date
            </label>

            <p className="text-gray-600">When does the Campaign End?</p>

            {isSurveyExpiring && (
              <React.Fragment>
                <label htmlFor="expiryDate" className="relative flex items-center justify-center">
                  <input
                    type="date"
                    id="expiryDate"
                    {...register("expiryDate")}
                    min={moment().format("YYYY-MM-DD")}
                    className="border-gray-300 border-2 h-[45px] w-full rounded-md focus:border relative overflow-hidden"
                  />

                  <CalendarIcon className="absolute right-0 w-5 mr-3" />
                </label>

                {errors.expiryDate && (
                  <p className="text-sm text-error">{errors.expiryDate.message}</p>
                )}
              </React.Fragment>
            )}

            <div className="flex items-center gap-2">
              <input {...register("neverExpires")} id="never-expire" type="checkbox" defaultChecked={true} onChange={handleClick} className="rounded text-accent_primary ring-0 outline-0 focus:ring-0" />

              <label htmlFor="never-expire" className="font-medium"  >
                This survey never expires
              </label>
            </div>
          </div>

          <div className="absolute bottom-5 right-5">
            <button
              type="submit"
              className="flex items-center gap-2 justify-center rounded-md bg-accent_primary px-10 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
            >
              Create Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
