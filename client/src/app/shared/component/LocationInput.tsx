import {
  CircularProgress,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { useState } from "react";
import { LocationIQSuggestion } from "../../../lib/types";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);

  return (
    <>
      <TextField
        {...props}
        {...field}
        value={field.value || ""}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <CircularProgress />}
      {suggestions.length > 0 && (
        <List>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => {}}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
}
