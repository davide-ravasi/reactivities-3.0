using Application.Activities.Command;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));

        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity(EditActivityDto activity)
        {
            return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));

            //return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }
    }
}

// findAsync is not guaranteed to return a non-null value, so we need to check for null and return NotFound if it is null
// findAsync is a method that is available on DbSet, which is a property of the AppDbContext class
// DbSet is a collection of entities that can be queried, added, modified, and deleted
// DbContext is a class that represents a session with the database and allows us to query and save instances of entities

// https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/primary-constructors
// this class use the Primary constructors paradigm to 
// inject the AppDbContext into the controller
// and then use it to query the database for a list of activities