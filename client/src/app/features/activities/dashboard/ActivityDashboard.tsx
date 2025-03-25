import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../detail/ActivityDetail";

export default function ActivityDashboard({
  activities,
  selectedActivity,
  handleSelectedActivity,
  handleCancelSelectedActivity,
}: {
  activities: Activity[];
  selectedActivity?: Activity;
  handleSelectedActivity: (id: string) => void;
  handleCancelSelectedActivity: () => void;
}) {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <h1>Activity Dashboard</h1>
        <ActivityList
          activities={activities}
          handleSelectedActivity={handleSelectedActivity}
        />
      </Grid2>
      <Grid2 size={5}>
        {selectedActivity && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            handleCancelSelectedActivity={handleCancelSelectedActivity}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
