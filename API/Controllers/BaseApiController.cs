using Application.Activities.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>() ?? throw new InvalidOperationException("Mediator not found");


        protected ActionResult<T> HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess)
            {
                return NotFound(result.Error);
            }

            if (result.IsSuccess && result.Value != null)
            {
                return result.Value;
            }

            return BadRequest(result.Error);

        }
    }
}