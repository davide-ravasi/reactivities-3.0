import { Grid2, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export interface IActivityDetailProps {
  selectedActivity: Activity;
  handleCancelSelectedActivity: () => void;
  handleOpenForm: (id?: string) => void;
}

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { activity } = useActivities(id);

  if (!activity) return <Typography>Loading .....</Typography>;

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid2>
      <Grid2 size={4}>
        <ActivityDetailsSidebar />
      </Grid2>
    </Grid2>
  );
}
