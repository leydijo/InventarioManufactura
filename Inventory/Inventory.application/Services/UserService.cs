using Inventory.application.Interfaces;
using Inventory.domain.Entities;
using Inventory.domain.Repositories;

namespace Inventory.application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }
        public async Task AddUserAsync(User user)
        {
            await _userRepository.AddAsync(user);
        }

        public async Task DeleteUserAsync(int userId)
        {
            await _userRepository.DeleteAsync(userId);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetEmailAsync(email);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task UpdateUserAsync(int userId)
        {
            await _userRepository.UpdateLastSessionAsync(userId);
        }
    }
}
