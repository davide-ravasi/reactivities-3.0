# .NET Reactivities Application - Complete Guide

## 🎯 Overview

This is a .NET Web API application built with Clean Architecture principles, designed for learning purposes. It's a backend API that manages activities (events) with full CRUD operations, validation, and proper error handling.

## 🏗️ Project Structure

```
reactivities-3.0/
├── 📁 API/           ← Web API layer (like Express.js server)
├── 📁 Application/   ← Business logic layer (like services)
├── 📁 Domain/        ← Data models layer (like TypeScript interfaces)
└── 📁 Persistence/   ← Database layer (like MongoDB/PostgreSQL)
```

### Architecture Comparison with JavaScript/React

| .NET Concept                 | JavaScript/React Equivalent | Purpose                 |
| ---------------------------- | --------------------------- | ----------------------- |
| API Controllers              | Express.js routes           | Handle HTTP requests    |
| Application Commands/Queries | Service functions           | Business logic          |
| Domain Entities              | TypeScript interfaces       | Data models             |
| Persistence DbContext        | Mongoose/Prisma             | Database operations     |
| DTOs                         | Request/Response types      | Data transfer objects   |
| Validators                   | Form validation (Yup/Zod)   | Input validation        |
| MediatR                      | Redux/Context               | Message passing pattern |

## 🔄 Request Flow

```
Frontend (React) → API → Application → Domain → Database
     ↑              ↓        ↓          ↓         ↓
   User clicks   Controller  Handler   Model    SQLite
```

### Detailed Flow Example

1. **Frontend sends**: `POST /api/activities` with JSON data
2. **Controller receives**: `CreateActivityDto` (like `req.body`)
3. **MediatR sends**: `CreateActivity.Command` (like dispatching an action)
4. **Validator checks**: Rules (like form validation)
5. **Handler processes**: Business logic (like your service function)
6. **Database saves**: Activity (like `MongoDB.save()`)
7. **Response returns**: Activity ID (like `res.json()`)

## 📁 Layer-by-Layer Explanation

### 1. API Layer (Like Express.js Server)

#### Program.cs - Main Entry Point

```csharp
// Like: const express = require('express')
var builder = WebApplication.CreateBuilder(args);

// Like: app.use(express.json())
builder.Services.AddControllers();

// Like: mongoose.connect() or prisma.$connect()
builder.Services.AddDbContext<AppDbContext>();

// Like: app.use(cors())
builder.Services.AddCors();

// Like: app.use(validationMiddleware)
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

var app = builder.Build();

// Like: app.listen(3000)
app.Run();
```

#### Controllers (Like Express Routes)

```csharp
// Like: app.get('/api/activities', handler)
[HttpGet]
public async Task<ActionResult<List<Activity>>> GetActivities()
{
    return await Mediator.Send(new GetActivityList.Query());
}

// Like: app.post('/api/activities', handler)
[HttpPost]
public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
{
    return await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto });
}
```

#### Base Controller

```csharp
// Like: const router = express.Router()
[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    // Like: dependency injection
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("Mediator not found");
}
```

### 2. Application Layer (Like Business Logic Services)

#### Commands (Like Service Functions)

```csharp
// Like: async function createActivity(data) { ... }
public class CreateActivity
{
    public class Command : IRequest<string>  // Like: Promise<string>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            // Like: validation, business logic, database save
            await validator.ValidateAndThrowAsync(request, cancellationToken);

            var activity = mapper.Map<Activity>(request.ActivityDto);
            context.Activities.Add(activity);
            await context.SaveChangesAsync(cancellationToken);

            return activity.Id;
        }
    }
}
```

#### DTOs (Like TypeScript Interfaces)

```csharp
// Like: interface CreateActivityRequest { title: string; description: string; }
public class CreateActivityDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Category { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
```

#### Validators (Like Form Validation)

```csharp
// Like: Yup schema or Zod validation
public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title cannot exceed 100 characters");

        RuleFor(x => x.ActivityDto.Description)
            .NotEmpty().WithMessage("Description is required")
            .MaximumLength(500).WithMessage("Description cannot exceed 500 characters");

        RuleFor(x => x.ActivityDto.Date)
            .NotEmpty().WithMessage("Date is required")
            .GreaterThan(DateTime.Now).WithMessage("Date must be in the future");

        RuleFor(x => x.ActivityDto.Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90");

        RuleFor(x => x.ActivityDto.Longitude)
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180");
    }
}
```

### 3. Domain Layer (Like Data Models)

#### Entity (Like TypeScript Interface)

```csharp
// Like: interface Activity { id: string; title: string; ... }
public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
```

### 4. Persistence Layer (Like Database Layer)

#### DbContext (Like Database Connection)

```csharp
// Like: mongoose.connection or prisma client
public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Activity> Activities { get; set; }  // Like: collection/table
}
```

## 🔧 MediatR Pattern (Like Redux/Context)

Instead of calling services directly, you send "messages" (commands/queries):

```csharp
// Instead of: activityService.createActivity(data)
// You do: mediator.send(new CreateActivity.Command { data })
```

### Validation Behavior (Like Middleware)

```csharp
// Like: Express middleware that runs before route handlers
public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator == null) return await next();

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        return await next();
    }
}
```

## 🛡️ Validation Middleware (Custom Implementation)

### The Problem

Without proper error handling, validation failures return messy responses:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "ActivityDto.Title": ["Title is required"],
    "ActivityDto.Description": ["Description is required"]
  }
}
```

### The Solution

With our custom middleware, you get clean, consistent responses:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "activityDto.title": ["Title is required"],
    "activityDto.description": ["Description is required"]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Middleware Implementation

#### ValidationExceptionMiddleware.cs

```csharp
public class ValidationExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ValidationExceptionMiddleware> _logger;

    public ValidationExceptionMiddleware(RequestDelegate next, ILogger<ValidationExceptionMiddleware> logger)
    {
        _next = next;        // Like: the next middleware in the chain
        _logger = logger;    // Like: console.log for logging
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);  // Like: next() in Express
        }
        catch (ValidationException ex)  // Like: catch (error) in JavaScript
        {
            _logger.LogWarning(ex, "Validation error occurred");  // Like: console.warn()
            await HandleValidationExceptionAsync(context, ex);
        }
    }

    private static async Task HandleValidationExceptionAsync(HttpContext context, ValidationException exception)
    {
        // Set response type and status (like: res.status(400).json())
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

        // Group errors by property (like: Object.groupBy() in JavaScript)
        var validationErrors = exception.Errors
            .GroupBy(x => x.PropertyName)
            .ToDictionary(
                g => g.Key,                    // Property name
                g => g.Select(x => x.ErrorMessage).ToArray()  // Array of error messages
            );

        // Create structured response
        var response = new ValidationErrorResponse
        {
            StatusCode = context.Response.StatusCode,
            Message = "Validation failed",
            Errors = validationErrors
        };

        // Convert to JSON (like: JSON.stringify())
        var jsonResponse = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase  // Like: camelCase in JavaScript
        });

        // Send response (like: res.send())
        await context.Response.WriteAsync(jsonResponse);
    }
}
```

#### ValidationErrorResponse Model

```csharp
// Like: interface ValidationErrorResponse { ... }
public class ValidationErrorResponse
{
    public int StatusCode { get; set; }           // Like: statusCode: number
    public string Message { get; set; } = string.Empty;  // Like: message: string
    public Dictionary<string, string[]> Errors { get; set; } = new();  // Like: errors: Record<string, string[]>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;  // Like: timestamp: Date
}
```

### Extension Method (Why We Use It)

#### MiddlewareExtensions.cs

```csharp
public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseValidationExceptionHandler(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ValidationExceptionMiddleware>();
    }
}
```

#### Benefits of Extension Methods

```csharp
// ❌ Without extension - verbose and less readable
app.UseMiddleware<ValidationExceptionMiddleware>();

// ✅ With extension - clean and descriptive
app.UseValidationExceptionHandler();
```

**Why use extension methods?**

- **Better Readability**: Self-documenting code
- **Consistency**: Follows .NET conventions
- **Maintainability**: Easy to modify middleware registration
- **Team-Friendly**: Other developers understand it immediately

## 🚀 How to Use the Application

### 1. Running the Application

```bash
# Navigate to API folder
cd API

# Run the application
dotnet run
```

### 2. Testing the API

#### Get All Activities

```bash
curl -X GET "https://localhost:5001/api/activities"
```

#### Create Activity (Valid Data)

```bash
curl -X POST "https://localhost:5001/api/activities" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Activity",
    "description": "This is a test activity",
    "date": "2024-12-25T10:00:00Z",
    "category": "test",
    "city": "Test City",
    "venue": "Test Venue",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
```

#### Create Activity (Invalid Data - Test Validation)

```bash
curl -X POST "https://localhost:5001/api/activities" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "description": "",
    "date": "2020-01-01T00:00:00Z",
    "category": "",
    "city": "",
    "venue": "",
    "latitude": 100,
    "longitude": 200
  }'
```

**Expected Response (Validation Error):**

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "activityDto.title": ["Title is required"],
    "activityDto.description": ["Description is required"],
    "activityDto.date": ["Date must be in the future"],
    "activityDto.category": ["Category is required"],
    "activityDto.city": ["City is required"],
    "activityDto.venue": ["Venue is required"],
    "activityDto.latitude": ["Latitude must be between -90 and 90"],
    "activityDto.longitude": ["Longitude must be between -180 and 180"]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Frontend Integration Example

### React Hook for Activities

```javascript
// Like: custom hook for API calls
const useActivities = (id) => {
  const queryClient = useQueryClient();

  const createActivity = useMutation({
    mutationFn: async (activity) => {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // errorData.errors will be structured like:
        // { "activityDto.title": ["Title is required"] }
        throw new Error(JSON.stringify(errorData.errors));
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  return { createActivity };
};
```

### React Form with Error Handling

```javascript
const ActivityForm = () => {
  const { createActivity } = useActivities();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (formData) => {
    try {
      await createActivity.mutateAsync(formData);
      // Success - navigate or show success message
    } catch (error) {
      // Parse validation errors
      const validationErrors = JSON.parse(error.message);
      setErrors(validationErrors);

      // Display errors to user
      // errors["activityDto.title"] = ["Title is required"]
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      {errors["activityDto.title"] && (
        <span className="error">{errors["activityDto.title"][0]}</span>
      )}
      {/* More form fields */}
    </form>
  );
};
```

## 🔧 Key Technologies Used

- **.NET 9.0**: Modern C# framework
- **Entity Framework Core**: Database ORM (like Mongoose/Prisma)
- **MediatR**: Message passing pattern (like Redux/Context)
- **FluentValidation**: Input validation (like Yup/Zod)
- **AutoMapper**: Object mapping (like manual mapping in JavaScript)
- **SQLite**: Database (like MongoDB/PostgreSQL)

## 🎯 Learning Benefits

This application demonstrates:

- **Clean Architecture**: Separation of concerns
- **Dependency Injection**: Proper service management
- **Validation**: Input validation and error handling
- **Middleware**: Custom request/response processing
- **Async/Await**: Modern asynchronous programming
- **Type Safety**: Strong typing with C#

## 🚀 Next Steps

1. **Add Authentication**: Implement JWT tokens
2. **Add Authorization**: Role-based access control
3. **Add Logging**: Structured logging with Serilog
4. **Add Testing**: Unit and integration tests
5. **Add Caching**: Redis for performance
6. **Add Real-time**: SignalR for live updates

---

This application serves as a solid foundation for learning .NET Web API development with modern patterns and best practices!
