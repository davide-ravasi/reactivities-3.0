import { Grid2, List, ListItem, ListItemText } from "@mui/material";

export default function ActivityDashboard({
  activities,
}: {
  activities: Activity[];
}) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={9}>
        <h1>Activity Dashboard</h1>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid2>
    </Grid2>
  );
}
