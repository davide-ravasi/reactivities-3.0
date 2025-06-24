namespace Application.Activities.Core;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }

    public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };

    public static Result<T> Failure(string error, int code) => new()
    {
        IsSuccess = false,
        Error = error,
        Code = code
    };
}

// generic Result class to encapsulate the result of an operation
// It contains properties to indicate success, hold a value, or an error message
// It also includes a status code to represent the outcome of the operation
// The class provides static methods to create success and failure results
