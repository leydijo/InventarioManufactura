using Inventory.application.Interfaces;
using Inventory.domain.Entities;
using Inventory.domain.Repositories;

namespace Inventory.application.Services
{
    public class ProductService : IProductService
    {   
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRespository)
        {
            _productRepository = productRespository;
        }

        public async Task AddProductAsync(Product product)
        {
             await _productRepository.AddAsync(product);
        }

        public async Task DeleteProductAsync(int productId)
        {
             await _productRepository.DeleteAsync(productId);
        }

        public async Task<Product> GetProductByIdAsync(int productId)
        {
            return await _productRepository.GetByIdAsync(productId);
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<bool> UpdateProductAsync(int productId, string stock, string state)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                return false;
            }
            if (string.IsNullOrEmpty(stock))
            {
                stock = "Disponible";
            }
            if (string.IsNullOrEmpty(state))
            {
                
                state = product.State;
            }
            product.Stock = stock;
            product.State = state;
            await _productRepository.UpdateAsync(product);
            return true;
        }

        public async Task<bool> BulkCreateProductsAsync(List<Product> products)
        {
            try
            {
                await _productRepository.AddRangeAsync(products);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
