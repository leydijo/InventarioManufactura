using Inventory.domain.Entities;
using Inventory.infrastructure.Data;
using Inventory.domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Inventory.infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {  
        private readonly AppDbContext _appDbContext;
        public ProductRepository(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }
        public async Task AddAsync(Product product)
        {
            product.State = "Disponible";
            product.DateRecord = DateTime.UtcNow;
            if (string.IsNullOrEmpty(product.Stock))
            {
                throw new ArgumentException("El stock no puede estar vacio.");
            }
            await _appDbContext.AddAsync(product);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int productId)
        {
            var product = await _appDbContext.Products.FindAsync(productId);
            if (product == null) throw new EntityNotFoundException(productId);

            _appDbContext.Products.Remove(product);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _appDbContext.Products.ToListAsync();
             
        }

        public async Task<Product> GetByIdAsync(int productId)
        {
            var product =  await _appDbContext.Products.FirstOrDefaultAsync(p => p.IdProduct == productId);
            if (product == null) throw new EntityNotFoundException(productId);
            return product;
        }

        public async Task UpdateAsync(Product product)
        {
    
            _appDbContext.Products.Update(product);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task AddRangeAsync(List<Product> products)
        {
            await _appDbContext.Products.AddRangeAsync(products);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
