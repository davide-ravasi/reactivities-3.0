import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <h1>Activity Dashboard</h1>
        <ActivityList />
      </Grid2>
      <Grid2 size={5}>Filters</Grid2>
    </Grid2>
  );
}
