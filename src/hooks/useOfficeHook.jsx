import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import myAxios from "../api/myAxios";
import { filter } from "lodash";

export const useOfficeHook = ({ page, filter }) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["Offices", page, filter],
    queryFn: () =>
      myAxios
        .get(`api/v1/user/offices`, {
          params: {
            page: page,
            ...filter,
          },
        })
        .then((res) => res?.data?.data),
    config: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};
