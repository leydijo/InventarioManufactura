using Inventory.domain.Entities;

namespace Inventory.application.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(int userId);
        Task DeleteUserAsync(int userId);
    }
}
