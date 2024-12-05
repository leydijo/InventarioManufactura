using Inventory.application.Interfaces;
using Inventory.domain.Repositories;

namespace Inventory.application.Services
{
    public class LoginService : ILoginService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher _passwordHasher;
        public LoginService(IUserRepository userRepository, IJwtService jwtService, IPasswordHasher passwordHasher) 
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;   
        }

        public async Task<string> AuthenticateAsync(string username, string password)
        {
            var user = await _userRepository.GetByUserNameAsync(username);
            if (user == null || !_passwordHasher.VerifyPassword(user.Password, password))
            {
                throw new UnauthorizedAccessException("Usuario o contraseña incorrectos.");
            }

            
            return _jwtService.GenerateToken(user.UserName, user.Role);
        }
    }
}
