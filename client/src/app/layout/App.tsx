import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const { mutation, activities, isLoading, error } = useActivities();

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities!.find((a) => a.id === id));
  };

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectedActivity(id);
    } else {
      handleCancelSelectedActivity();
    }
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  const deleteActivity = (id: string) => {
    // const updatedActivities = activities.filter((a) => a.id !== id);
    // setActivities(updatedActivities);
    console.log(id);
  };

  {
    return (
      <Box sx={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          {!activities || isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <ActivityDashboard
              activities={activities}
              selectedActivity={selectedActivity}
              handleSelectedActivity={handleSelectedActivity}
              handleCancelSelectedActivity={handleCancelSelectedActivity}
              editMode={editMode}
              handleOpenForm={handleOpenForm}
              handleCloseForm={handleCloseForm}
              s
              deleteActivity={deleteActivity}
            />
          )}
        </Container>
      </Box>
    );
  }
}

export default App;
