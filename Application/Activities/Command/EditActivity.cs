using MediatR;
using Persistence;
using Domain;
using AutoMapper;

namespace Application.Activities.Command
{
    public class EditActivity
    {
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }

        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) ?? throw new Exception("Activity not found");

                // activity.Title = request.Activity.Title ?? activity.Title;
                // activity.Description = request.Activity.Description ?? activity.Description;
                // activity.Category = request.Activity.Category ?? activity.Category;
                // activity.Date = request.Activity.Date != default ? request.Activity.Date : activity.Date;
                // activity.City = request.Activity.City ?? activity.City;
                // activity.Venue = request.Activity.Venue ?? activity
                //     .Venue;
                // activity.Latitude = request.Activity.Latitude != default ? request.Activity.Latitude : activity.Latitude;
                // activity.Longitude = request.Activity.Longitude != default ? request.Activity.Longitude : activity.Longitude;

                mapper.Map(request.Activity, activity);


                await context.SaveChangesAsync(cancellationToken);

                return activity.Id;
            }
        }
    }
}