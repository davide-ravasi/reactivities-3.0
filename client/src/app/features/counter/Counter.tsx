import { Button, ButtonGroup, Typography } from "@mui/material";
import { useStore } from "../../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (
    <>
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
    </>
  );
});

export default Counter;
