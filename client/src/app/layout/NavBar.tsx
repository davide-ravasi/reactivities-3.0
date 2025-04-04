import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, MenuItem } from "@mui/material";
import { Group } from "@mui/icons-material";
import { NavLink } from "react-router";

export default function NavBar() {
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
              <MenuItem
                component={NavLink}
                to="/"
                sx={{ display: "flex", gap: 2 }}
              >
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItem
                component={NavLink}
                to="/activities"
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Activities
              </MenuItem>
              <MenuItem
                component={NavLink}
                to="/createActivitY"
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Create activitY
              </MenuItem>
              {/* <MenuItem
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                About
              </MenuItem> */}
              {/* <MenuItem
                sx={{
                  fontSize: "1.2em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Contact
              </MenuItem> */}
            </Box>
            <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={() => {}}
            >
              User menu
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
