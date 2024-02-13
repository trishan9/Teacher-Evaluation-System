import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSchools } from "@/server/actions";
import Schools from "../_components/Schools";

export default async function ManageSchool() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Schools />
      </HydrationBoundary>
    </section>
  );
}
