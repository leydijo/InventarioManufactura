using Inventory.domain.Entities;

namespace Inventory.domain.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetEmailAsync(string uemail);
        Task AddAsync(User user);
        Task UpdateLastSessionAsync(int id);
        Task DeleteAsync(int userId);
        Task<User> GetByUserNameAsync(string userName);
    }
}
