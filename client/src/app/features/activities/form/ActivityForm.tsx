import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm, FieldValues } from "react-hook-form";
import { useEffect } from "react";

export default function ActivityForm() {
  const { register, reset, handleSubmit } = useForm<Activity>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activity, isLoadingActivity, createActivity, updateActivity } =
    useActivities(id);

  useEffect(() => {
    if (activity) {
      reset(activity);
    }
  }, [activity, reset]);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const handleCancel = () => {
    if (activity?.id) {
      navigate(`/activities/${activity.id}`);
    } else {
      navigate("/activities");
    }
  };

  if (isLoadingActivity) return <Typography>Loading...</Typography>;
  //if (!activity) return <Typography>Activity not found</Typography>;

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
        <TextField
          {...register("title")}
          label="Title"
          defaultValue={activity?.title}
        />
        <TextField
          {...register("description")}
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          {...register("category")}
          label="Category"
          defaultValue={activity?.category}
          select
        />
        <TextField
          {...register("date")}
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : ""
          }
        />
        <TextField
          {...register("city")}
          label="City"
          defaultValue={activity?.city}
        />
        <TextField
          {...register("venue")}
          label="Venue"
          defaultValue={activity?.venue}
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
