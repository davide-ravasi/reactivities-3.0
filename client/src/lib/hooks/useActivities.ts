import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.put<Activity>("/activities", activity);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post<Activity>("/activities", activity);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      const response = await agent.delete(`/activities/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return {
    createActivity,
    updateActivity,
    deleteActivity,
    activities,
    isLoading,
    error,
  };
};
