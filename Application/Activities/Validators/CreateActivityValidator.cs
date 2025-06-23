using Application.Activities.Command;
using FluentValidation;

namespace Application.Activities.Validators;

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

        /*RuleFor(x => x.ActivityDto.Category)
            .NotEmpty().WithMessage("Category is required")
            .MaximumLength(50).WithMessage("Category cannot exceed 50 characters");

        RuleFor(x => x.ActivityDto.City)
            .NotEmpty().WithMessage("City is required")
            .MaximumLength(100).WithMessage("City cannot exceed 100 characters");

        RuleFor(x => x.ActivityDto.Venue)
            .NotEmpty().WithMessage("Venue is required")
            .MaximumLength(200).WithMessage("Venue cannot exceed 200 characters");

        RuleFor(x => x.ActivityDto.Date)
            .NotEmpty().WithMessage("Date is required")
            .GreaterThan(DateTime.Now).WithMessage("Date must be in the future");

        RuleFor(x => x.ActivityDto.Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90");

        RuleFor(x => x.ActivityDto.Longitude)
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180");
        */
    }
}
