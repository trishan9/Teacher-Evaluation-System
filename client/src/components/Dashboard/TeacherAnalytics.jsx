import { useState } from "react";
import _ from "lodash";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import questions from "@/constants/questions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TeacherAnalytics = ({ survey }) => {
  const labels = survey?.teacherDetails?.map(
    (teacherDetail) => teacherDetail.name
  );
  const size = useWindowSize();

  function getRatingsByQuestionId(questionId) {
    const ratingsByType = {
      highlyAgree: [],
      agree: [],
      disagree: [],
      highlyDisagree: [],
    };

    survey?.teacherDetails?.forEach((teacher) => {
      const ratings = _.find(teacher.ratings, { questionId });
      if (ratings) {
        ratingsByType.highlyAgree.push(ratings.highlyAgree);
        ratingsByType.agree.push(ratings.agree);
        ratingsByType.disagree.push(ratings.disagree);
        ratingsByType.highlyDisagree.push(ratings.highlyDisagree);
      }
    });

    return ratingsByType;
  }
  const [teacherData, setTeacherData] = useState(
    getRatingsByQuestionId("question-1")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Highly Agree",
        data: teacherData.highlyAgree,
        backgroundColor: "#4bc0c0",
      },
      {
        label: "Agree",
        data: teacherData.agree,
        backgroundColor: "#6895D2",
      },
      {
        label: "Disagree",
        data: teacherData.disagree,
        backgroundColor: "#F3B95F",
      },
      {
        label: "Highly Disagree",
        data: teacherData.highlyDisagree,
        backgroundColor: "#D04848",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  labels?.length <= 8 ? (options.indexAxis = "y") : "";
  size.width <= 480 ? (options.indexAxis = "") : "";

  return (
    <div className="w-full p-4 bg-white border-2 rounded-lg">
      <p className="text-lg font-semibold">Teacher Analytics</p>

      <div className="mt-4">
        <Select
          defaultValue={questions[0].id}
          onValueChange={(value) => {
            setTeacherData(getRatingsByQuestionId(value));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="font-primary">
            <SelectGroup>
              <SelectLabel>Metric</SelectLabel>
              {questions.map((question) => (
                <SelectItem key={question.id} value={question.id}>
                  {question.type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center gap-2 my-6 lg:max-w-[60vw] xl:max-w-[70vw] 2xl:max-w-[100vw]">
        <Bar
          datasetIdKey="id"
          width={50}
          height={90}
          className="flex items-center justify-center w-[10rem]"
          options={options}
          data={data}
        />
      </div>
    </div>
  );
};

export default TeacherAnalytics;
