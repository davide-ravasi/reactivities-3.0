import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { Link } from "react-router";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const { deleteActivity } = useActivities();

  // const handleDeleteActivity = async (id: string) => {
  //   await deleteActivity.mutateAsync(id);
  // };

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
            onClick={() => {}}
            disabled={deleteActivity.isPending}
          >
            Delete
          </Button>
          <Button
            size="medium"
            variant="contained"
            component={Link}
            to={`/activities/${activity.id}`}
          >
            View
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
