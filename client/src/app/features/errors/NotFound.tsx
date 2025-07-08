import { Button, Paper, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Paper
      sx={{
        p: 6,
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography gutterBottom variant="h3">
        Oops - we could not find what you were looking for
      </Typography>
      <Button fullWidth href="/activities" component="a">
        Return to activities page
      </Button>
    </Paper>
  );
}
