namespace Inventory.application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(string username, string role);
    }
}
