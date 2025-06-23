# Validation Exception Middleware

This middleware handles FluentValidation exceptions and returns properly structured JSON responses for validation errors.

## How it works

1. **Catches ValidationException**: The middleware catches any `ValidationException` thrown by FluentValidation during request processing.

2. **Structures the Response**: It transforms the validation errors into a consistent JSON format with:

   - HTTP Status Code (400 Bad Request)
   - Error message
   - Grouped validation errors by property name
   - Timestamp

3. **Logs the Error**: Validation errors are logged as warnings for monitoring purposes.

## Response Format

When validation fails, the API returns a response like this:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "activityDto.title": ["Title is required"],
    "activityDto.description": ["Description is required"],
    "activityDto.date": ["Date must be in the future"]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Usage

The middleware is automatically registered in `Program.cs` and will handle all validation errors thrown by your FluentValidation validators.

### Example: Testing with CreateActivity

Send a POST request to `/api/activities` with invalid data:

```json
{
  "title": "",
  "description": "",
  "date": "2020-01-01T00:00:00Z",
  "category": "",
  "city": "",
  "venue": "",
  "latitude": 100,
  "longitude": 200
}
```

This will trigger validation errors and return the structured response above.

## Benefits

- **Consistent Error Format**: All validation errors follow the same structure
- **Client-Friendly**: Easy for frontend applications to parse and display
- **Centralized Handling**: No need to handle validation errors in each controller
- **Proper HTTP Status Codes**: Returns 400 Bad Request for validation errors
