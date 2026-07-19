using Ecommerce.API.DTOs;
using Ecommerce.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Esto mapea automáticamente a /api/users
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterUserRequest request)
        {
            var response = await _userService.RegisterUserAsync(request);
            return StatusCode(201, response); // Retorna 201 Created
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest request)
        {
            return Ok(await _userService.LoginUserAsync(request)); // Retorna 200 OK
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse>> ReadUser(int id)
        {
            return Ok(await _userService.ReadUserAsync(id));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserResponse>> UpdateUser(int id, [FromBody] UpdateUserRequest request)
        {
            return Ok(await _userService.UpdateUserAsync(id, request));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> DeleteUser(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent(); // Retorna 204 No Content
        }
    }
}