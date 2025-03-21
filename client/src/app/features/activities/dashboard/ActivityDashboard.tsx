import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={9}>
        <h1>Activity Dashboard</h1>
        <ActivityList activities={activities} />
      </Grid2>
    </Grid2>
  );
}
