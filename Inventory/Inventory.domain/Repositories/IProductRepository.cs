using Inventory.domain.Entities;

namespace Inventory.domain.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int productId);
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int productId);
        Task AddRangeAsync(List<Product> products);
    }
}
