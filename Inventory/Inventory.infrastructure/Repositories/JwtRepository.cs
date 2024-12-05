using Inventory.application.Interfaces;
using Inventory.infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Inventory.infrastructure.Repositories
{
    public class JwtRepository : IJwtService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _config;
        private readonly List<string> _invalidatedTokens = new();

        public JwtRepository(AppDbContext appDbContext, IConfiguration config)
        {
            _appDbContext = appDbContext;
            _config = config;
        }

        public string GenerateToken(string username, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role,role)
            };


            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
    }

}
