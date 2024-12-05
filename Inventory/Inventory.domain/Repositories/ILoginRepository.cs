using Inventory.domain.Entities;

namespace Inventory.domain.Repositories
{
    public interface ILoginRepository
    {
        string GenerateJwtToken(User user);
        
    }
}
