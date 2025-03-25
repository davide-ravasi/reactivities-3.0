import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../detail/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

export interface IActivityDashboardProps {
  activities: Activity[];
  selectedActivity?: Activity;
  handleSelectedActivity: (id: string) => void;
  handleCancelSelectedActivity: () => void;
  editMode: boolean;
  handleOpenForm: (id?: string) => void;
  handleCloseForm: () => void;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  handleSelectedActivity,
  handleCancelSelectedActivity,
  editMode,
  handleOpenForm,
  handleCloseForm,
}: IActivityDashboardProps) {
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
        {selectedActivity && !editMode && (
          <ActivityDetail
            selectedActivity={selectedActivity}
            handleCancelSelectedActivity={handleCancelSelectedActivity}
            handleOpenForm={handleOpenForm}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            closeForm={handleCloseForm}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
