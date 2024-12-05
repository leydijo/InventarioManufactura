using Inventory.application.Interfaces;
using Inventory.domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService) 
        {
            _loginService = loginService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Por favor, proporcione un nombre de usuario y contraseña.");
            }

            try
            {
                var token = await _loginService.AuthenticateAsync(request.UserName, request.Password);
                return Ok(new { Token = token ,user = request.UserName});
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Usuario o contraseña incorrectos.");
            }
        }
    }
}
