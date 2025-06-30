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
      reset(activity);
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
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
        {/* <TextField
          {...register("title")}
          label="Title"
          defaultValue={activity?.title}
          error={!!errors.title}
          helperText={errors.title ? errors.title.message : ""}
        /> */}
        <TextInput name="title" label="Title" control={control} />
        {/* <TextField
          {...register("description")}
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ""}
        /> */}
        <TextInput
          name="description"
          label="Description"
          control={control}
          multiline
          rows={3}
        />
        {/*<TextField
          {...register("category")}
          label="Category"
          defaultValue={activity?.category}
          select
          error={!!errors.category}
          helperText={errors.category ? errors.category.message : ""}
        />*/}
        <SelectInput
          name="category"
          label="Category"
          items={categoryOptions}
          control={control}
          select
        ></SelectInput>
        <TextInput name="date" label="Date" control={control} type="date" />
        {/*<TextField
          {...register("date")}
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : ""
          }
          error={!!errors.date}
          helperText={errors.date ? errors.date.message : ""}
        />*/}
        {/*<TextField
          {...register("city")}
          label="City"
          defaultValue={activity?.city}
          error={!!errors.city}
          helperText={errors.city ? errors.city.message : ""}
        />*/}
        <TextInput name="city" label="City" control={control} />
        {/*<TextField
          {...register("venue")}
          label="Venue"
          defaultValue={activity?.venue}
          error={!!errors.venue}
          helperText={errors.venue ? errors.venue.message : ""}
        />*/}
        <TextInput name="venue" label="Venue" control={control} />
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
