import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, LinearProgress, MenuItem } from "@mui/material";
import { Group } from "@mui/icons-material";
import MenuItemLink from "../shared/component/MenuItemLink";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";

export default function NavBar() {
  const { uiStore } = useStore();

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
              <MenuItemLink to="/">
                <Group fontSize="large" />
                <Typography variant="h4" fontWeight="bold">
                  Reactivities
                </Typography>
              </MenuItemLink>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/createActivity">Create activity</MenuItemLink>
              <MenuItemLink to="/errors">Errors</MenuItemLink>
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
            {/* <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={() => {}}
            >
              User menu
            </Button> */}
            <MenuItem>User menu</MenuItem>
          </Toolbar>
        </Container>
      </AppBar>
      <Observer>
        {() => {
          const { isLoading } = uiStore;
          return isLoading ? <LinearProgress color="primary" /> : null;
        }}
      </Observer>
    </Box>
  );
}
