import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";

export interface IActivityDetailProps {
  selectedActivity: Activity;
  handleCancelSelectedActivity: () => void;
  handleOpenForm: (id?: string) => void;
}

export default function ActivityDetail({
  selectedActivity,
  handleCancelSelectedActivity,
  handleOpenForm,
}: IActivityDetailProps) {
  const { activities } = useActivities();

  const activity = activities?.find((a) => a.id === selectedActivity.id);

  if (!activity) return <Typography>Loading .....</Typography>;

  return (
    <Card>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => handleOpenForm(activity.id)}>
          Edit
        </Button>
        <Button color="inherit" onClick={() => handleCancelSelectedActivity()}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
