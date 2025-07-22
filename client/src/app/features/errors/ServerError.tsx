import { Button, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  const error = state?.error;

  console.log(error);

  return (
    <Paper
      sx={{
        p: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {error.message || "Server Error"}
          </Typography>
          <Divider />
          <Typography variant="body1" color="error" sx={{ p: 4 }}>
            {error.details || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button fullWidth href="/activities" component="a">
        Return to activities page
      </Button>
    </Paper>
  );
}
