import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();

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
    enabled: location.pathname === "/activities", // Only run the query if the pathname is "/activities"
  });

  const {
    data: activity,
    isLoading: isLoadingActivity,
    error: isErrorActivity,
  } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run the query if id is defined
  });

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
    activity,
    isLoading,
    isLoadingActivity,
    error,
    isErrorActivity,
  };
};
