import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

export default function ActivityCard({
  activity,
  handleSelectedActivity,
  deleteActivity,
}: {
  activity: Activity;
  handleSelectedActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
}) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.venue}/{activity.city}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip label={activity.category} variant="outlined" />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => deleteActivity(activity.id)}
          >
            Delete
          </Button>
          <Button
            size="medium"
            variant="contained"
            onClick={() => handleSelectedActivity(activity.id)}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
