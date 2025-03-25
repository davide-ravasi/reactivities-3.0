import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, MenuItem } from "@mui/material";
import { Group } from "@mui/icons-material";

export default function NavBar({
  openForm,
}: {
  openForm: (id?: string) => void;
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage:
            "linea-gradient(135deg, #182a73 0%, #218aae 69%, 20a7ac 89%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <MenuItem sx={{ display: "flex", gap: 2 }}>
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItem
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Reactivities
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                About
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Contact
              </MenuItem>
            </Box>
            <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={openForm}
            >
              Create activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
