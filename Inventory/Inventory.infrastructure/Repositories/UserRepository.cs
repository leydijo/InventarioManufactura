using Inventory.domain.Entities;
using Inventory.domain.Repositories;
using Inventory.infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Inventory.infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _appDbContext;
        public UserRepository(AppDbContext appDbContext)
        { 
            _appDbContext = appDbContext;
        }

        public async Task AddAsync(User user)
        {
            var existingEmail = await _appDbContext.Users.AnyAsync(u => u.Email == user.Email);

            if(existingEmail)
            {
                throw new InvalidOperationException("El email ya existe.");
            }

            var existingUserName = await _appDbContext.Users.AnyAsync(u =>u.UserName == user.UserName);
            if (existingUserName) 
            {
                throw new InvalidOperationException("El nombre de usuario ya existe.");
            }
            var hashed = BCrypt.Net.BCrypt.HashPassword(user.Password);
            var userAdd = new User
            {
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                Password = hashed
            };
            await _appDbContext.AddAsync(userAdd);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int userId)
        {
            var user = await _appDbContext.Users.FindAsync(userId);
            if (user == null) throw new EntityNotFoundException(userId);

            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _appDbContext.Users.ToListAsync(); 
        }

        public async Task<User> GetEmailAsync(string email)
        {
            return await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task UpdateLastSessionAsync(int id)
        {
            var userUpdate = await _appDbContext.Users.FindAsync(id);
            if (userUpdate == null)
            {
                throw new EntityNotFoundException(id);
            }

            userUpdate.LastSession = DateTime.UtcNow;
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<User> GetByUserNameAsync(string userName)
        {
            return await _appDbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        }
    }
}
