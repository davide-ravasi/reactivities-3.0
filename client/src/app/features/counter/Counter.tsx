import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box sx={{ width: "60%" }}>
        <Typography variant="h3">{counterStore.title}</Typography>
        <Typography variant="h4">The count is {counterStore.count}</Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            color="error"
            onClick={() => counterStore.increment(1)}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => counterStore.decrement(1)}
          >
            Decrement
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => counterStore.increment(5)}
          >
            Increment by five
          </Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ width: "40%", p: 4 }}>
        <Typography variant="h4">
          Counter Events ({counterStore.getEvents})
        </Typography>
        <List>
          {counterStore.events.map((event) => (
            <ListItem key={event}>
              <ListItemText primary={event} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
});

export default Counter;
