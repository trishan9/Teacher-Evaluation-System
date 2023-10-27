import { useState } from "react";

const CreateSurvey = () => {
  const [isSurveyExpiring, setIsSurveyExpiring] = useState(true);
  const handleClick = () => {
    setIsSurveyExpiring((prevState) => !prevState);
  };
  return (
    <div>
      <p className="text-xl font-bold">Create Survey</p>

      <div className="bg-white rounded-xl shadow-sm min-h-[80vh] min-w-[70vw] pl-4 pt-2 pr-4 mt-10 flex flex-col">
        <p className="mt-4 text-2xl font-semibold text-accent_primary">Info</p>

        <p className="font-medium text-neutral_light">
          Fill the details for your Survey.
        </p>

        <form action="" className="space-y-5 block mt-7">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="block font-semibold">
              Survey Name
            </label>

            <p className="text-info">What is the name of your Survey?</p>

            <input
              type="text"
              id="surveyName"
              className="block h-[46px] w-[25rem] rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="block font-semibold mt-1">
              Expiry Date
            </label>

            <p className="text-info">When does the Campaign End?</p>

            <div className="flex gap-2 items-center">
              <input type="checkbox" onChange={handleClick} />

              <label htmlFor="" className="text-sm font-medium">
                This Survey Never Expires
              </label>
            </div>

            {isSurveyExpiring && (
              <input
                type="date"
                id="expiryDate"
                className="block h-[46px] w-[20rem] rounded-lg"
              />
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-[10rem] items-center gap-2 justify-center rounded-md bg-accent_primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#1e2f49] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out mt-10"
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
