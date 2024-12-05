using Inventory.domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Inventory.infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public DbSet<Operation> Operations { get; set; }

        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasKey(p => p.IdProduct);
            modelBuilder.Entity<Operation>().HasKey(o => o.IdOperation);
            modelBuilder.Entity<User>().HasKey(u => u.IdUser);
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.UserName).IsUnique();
                entity.HasIndex(u => u.Email).IsUnique();

            });
            base.OnModelCreating(modelBuilder);
        }

    }
}
