import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { QueryClient } from "@tanstack/react-query";

export const useActivities = () => {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
  });
  const queryClient = new QueryClient();

  const updateActivities = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.put<Activity>("/activities", activity);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return {
    updateActivities,
    activities,
    isLoading,
    error,
  };
};
