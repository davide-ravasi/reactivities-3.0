import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../../lib/util/util";
import MapComponent from "../../../shared/component/MapComponent";
import { Activity } from "../../../../lib/types";
import { useState } from "react";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
  const [mapOpen, setMapOpen] = useState(true);

  return (
    <Paper sx={{ mb: 2 }}>
      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Info color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography>{activity.description}</Typography>
        </Grid2>
      </Grid2>
      <Divider />
      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid2>
        <Grid2 size={11}>
          <Typography>{formatDate(activity.date)}</Typography>
        </Grid2>
      </Grid2>
      <Divider />

      <Grid2 container alignItems="center" pl={2} py={1}>
        <Grid2 size={1}>
          <Place color="info" fontSize="large" />
        </Grid2>
        <Grid2
          size={11}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            {activity.venue}, {activity.city}
          </Typography>
          <Button onClick={() => setMapOpen(!mapOpen)}>
            {mapOpen ? "Hide Map" : "Show Map"}
          </Button>
        </Grid2>
      </Grid2>
      <Divider />
      {mapOpen && (
        <Box
          sx={{
            height: "400px",
            zIndex: 1000,
            display: "block",
            width: "100%",
          }}
        >
          <MapComponent
            longitude={activity.longitude}
            latitude={activity.latitude}
            venue={activity.venue}
          />
        </Box>
      )}
    </Paper>
  );
}
