import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
}
