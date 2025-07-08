using MediatR;
using Persistence;
using Domain;
using AutoMapper;
using Application.Activities.Core;
using Application.Activities.DTOs;

namespace Application.Activities.Command
{
    public class EditActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditActivityDto ActivityDto { get; set; }

        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.ActivityDto.Id], cancellationToken);


                if (activity == null) return Result<Unit>.Failure("Failed to found the activity", 404);

                // activity.Title = request.Activity.Title ?? activity.Title;
                // activity.Description = request.Activity.Description ?? activity.Description;
                // activity.Category = request.Activity.Category ?? activity.Category;
                // activity.Date = request.Activity.Date != default ? request.Activity.Date : activity.Date;
                // activity.City = request.Activity.City ?? activity.City;
                // activity.Venue = request.Activity.Venue ?? activity
                //     .Venue;
                // activity.Latitude = request.Activity.Latitude != default ? request.Activity.Latitude : activity.Latitude;
                // activity.Longitude = request.Activity.Longitude != default ? request.Activity.Longitude : activity.Longitude;

                mapper.Map(request.ActivityDto, activity);


                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("The activity has not be edited", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}