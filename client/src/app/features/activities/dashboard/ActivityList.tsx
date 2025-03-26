import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

export default function ActivityList({
  activities,
  handleSelectedActivity,
  deleteActivity,
}: {
  activities: Activity[];
  handleSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          handleSelectedActivity={handleSelectedActivity}
          deleteActivity={deleteActivity}
        />
      ))}
    </Box>
  );
}
