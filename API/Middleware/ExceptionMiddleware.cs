using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context); // call the next middleware if no exception occurs
        }
        catch (ValidationException ex) // catch validation exceptions from FluentValidation
        {
            await HandleValidationException(context, ex); // handle validation exceptions specifically
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex}");
        }
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                }
                else
                {
                    validationErrors[error.PropertyName] = new[] { error.ErrorMessage };
                }
            }
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status400BadRequest;

        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation",
            Detail = "One or more validation errors occurred.",
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}
