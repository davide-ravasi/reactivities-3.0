import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

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
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Box>
  );
}

export default App;
