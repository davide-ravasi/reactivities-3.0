import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export interface IActivityDetailProps {
  selectedActivity: Activity;
  handleCancelSelectedActivity: () => void;
}

export default function ActivityDetail({
  selectedActivity,
  handleCancelSelectedActivity,
}: IActivityDetailProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${selectedActivity.category}.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {selectedActivity.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {selectedActivity.date}
        </Typography>
        <Typography variant="body2">{selectedActivity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary">Edit</Button>
        <Button color="inherit" onClick={() => handleCancelSelectedActivity()}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
