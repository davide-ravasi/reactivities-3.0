import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
//import { FormEvent } from "react";

export default function ActivityForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activity, isLoadingActivity, createActivity, updateActivity } =
    useActivities(id);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (activity?.id) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${activity.id}`);
    } else {
      createActivity.mutate(data as unknown as Activity, {
        onSuccess: (data) => {
          navigate(`/activities/${data}`);
        },
      });
    }

    // const updatedActivities = activities.map((a) =>
    //   a.id === activity.id ? activity : a
    // );
    //setActivities(updatedActivities);

    //const newActivity = { ...activity, id: String(activities.length + 1) };
    //setActivities([...activities, newActivity]);
    //setEditMode(false);

    //submitForm(data as unknown as Activity);
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
        Create activity
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        onSubmit={handleSubmit}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : ""
          }
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
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
