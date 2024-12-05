namespace Inventory.application.Interfaces
{
    public interface ILoginService
    {
        Task<string> AuthenticateAsync(string username, string password);
    }
}
