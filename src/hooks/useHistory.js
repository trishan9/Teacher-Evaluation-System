import { useEffect, useState } from "react";
import { doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { surveysRef } from "@/config/firebase";
import { useRecoilState } from "recoil";
import { db } from "@/config/firebase";
import { authState } from "@/states";
import moment from "moment";

const useHistory = () => {
  const [authUser] = useRecoilState(authState);
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getSurveys = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const currentUserSurveysRef = query(
          surveysRef,
          where("user.id", "==", authUser.id)
        );
        const snapshot = await getDocs(currentUserSurveysRef);
        const tempSurveys = [];
        snapshot?.docs?.map((doc) => {
          tempSurveys.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setSurveys(tempSurveys);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getSurveys();
  }, [authUser]);

  return { surveys, isLoading, isError };
};

export default useHistory;
