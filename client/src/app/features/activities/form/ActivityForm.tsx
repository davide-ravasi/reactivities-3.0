import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  activitySchema,
  ActivitySchema,
} from "../../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../shared/component/TextInput";
import SelectInput from "../../../shared/component/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../shared/component/DateTimeInput";
import LocationInput from "../../../shared/component/LocationInput";

export default function ActivityForm() {
  const { reset, handleSubmit, control } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activity, isLoadingActivity, createActivity, updateActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity) {
      console.log("Resetting form with activity data:", activity);
      reset({
        ...activity,
        location: {
          venue: activity.venue,
          city: activity.city || "",
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    console.log(data);
    // search the methods to create or update the activity
  };

  const handleCancel = () => {
    if (activity?.id) {
      navigate(`/activities/${activity.id}`);
    } else {
      navigate("/activities");
    }
  };

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput name="title" label="Title" control={control} />
        <TextInput
          name="description"
          label="Description"
          control={control}
          multiline
          rows={3}
        />
        <Box display="flex" gap={2}>
          <SelectInput
            name="category"
            label="Category"
            items={categoryOptions}
            control={control}
            select
          ></SelectInput>
          <DateTimeInput name="date" label="Date" control={control} />
        </Box>
        <LocationInput
          name="location"
          control={control}
          label="Enter the location"
        />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button onClick={() => handleCancel()} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
