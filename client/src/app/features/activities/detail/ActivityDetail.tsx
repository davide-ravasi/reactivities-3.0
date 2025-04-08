import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { Link, useNavigate, useParams } from "react-router";

export interface IActivityDetailProps {
  selectedActivity: Activity;
  handleCancelSelectedActivity: () => void;
  handleOpenForm: (id?: string) => void;
}

export default function ActivityDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { activity } = useActivities(id);

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
        <Button component={Link} to={`/manage/${activity.id}`} color="primary">
          Edit
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/activities");
          }}
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
