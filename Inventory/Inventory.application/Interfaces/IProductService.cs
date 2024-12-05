using Inventory.domain.Entities;

namespace Inventory.application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int productId);
        Task AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(int productId, string stock, string state);
        Task DeleteProductAsync(int productId);
        Task<bool> BulkCreateProductsAsync(List<Product> products);
    }
}
