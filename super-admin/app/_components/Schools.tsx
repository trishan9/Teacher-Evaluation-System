"use client";

import { useQuery } from "@tanstack/react-query";
import { getSchools } from "@/server/actions";
import List from "./List";

const Schools = () => {
  const { data, error } = useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    return (
      <div className="w-full mt-2 md:px-6 font-primary">
        {data.map((school: any) => (
          <List school={school} key={school.id} />
        ))}
      </div>
    );
  }
};

export default Schools;
