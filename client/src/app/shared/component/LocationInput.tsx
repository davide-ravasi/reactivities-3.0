import {
  CircularProgress,
  debounce,
  List,
  ListItemButton,
  TextField,
} from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { LocationIQSuggestion } from "../../../lib/types";
import axios from "axios";

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");

  const locationIQUrl = `https://api.locationiq.com/v1/autocomplete?key=${
    import.meta.env.VITE_LOCATION_IQ_API_KEY
  }&q=tower%20of%20lo%20&limit=5&dedupe=1&`;

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query && query.length < 3) {
          setSuggestions([]);
          return;
        }

        setLoading(true);

        try {
          const response = await axios.get<LocationIQSuggestion[]>(
            `${locationIQUrl}q=${query}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationIQUrl]
  );

  const handleChange = async (value: string) => {
    field.onChange(value);
    await fetchSuggestions(value);
  };

  const handleSelected = (suggestion: LocationIQSuggestion) => {
    console.log("Selected suggestion:", suggestion);
    const city =
      suggestion.address.city ||
      suggestion.address.town ||
      suggestion.address.village;
    const venue = suggestion.display_name;
    const latitude = parseFloat(suggestion.lat);
    const longitude = parseFloat(suggestion.lon);

    field.onChange({
      city,
      venue,
      latitude,
      longitude,
    });

    setInputValue(suggestion.display_name);
    setSuggestions([]);
  };

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue || "");
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  return (
    <>
      <TextField
        {...props}
        fullWidth
        value={inputValue}
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        onChange={(e) => handleChange(e.target.value)}
      />
      {loading && <CircularProgress />}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelected(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
}
