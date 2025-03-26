import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find((a) => a.id === id));
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

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      const updatedActivities = activities.map((a) =>
        a.id === activity.id ? activity : a
      );
      setActivities(updatedActivities);
    } else {
      const newActivity = { ...activity, id: String(activities.length + 1) };
      setActivities([...activities, newActivity]);
    }

    setEditMode(false);
  };

  const deleteActivity = (id: string) => {
    const updatedActivities = activities.filter((a) => a.id !== id);
    setActivities(updatedActivities);
  };

  // axios automatically parses JSON responses
  // and returns the parsed data in the response.data property
  // no need to call response.json()
  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Box sx={{ backgroundColor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectedActivity={handleSelectedActivity}
          handleCancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          handleOpenForm={handleOpenForm}
          handleCloseForm={handleCloseForm}
          handleSubmitForm={handleSubmitForm}
          deleteActivity={deleteActivity}
        />
      </Container>
    </Box>
  );
}

export default App;
