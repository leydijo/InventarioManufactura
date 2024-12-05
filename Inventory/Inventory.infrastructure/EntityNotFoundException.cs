namespace Inventory.infrastructure
{
    public class EntityNotFoundException : Exception
    {
        public int _EntityId { get; }
        public EntityNotFoundException(int entityId) : base($"The entity with ID {entityId} not found")
        {
            _EntityId = entityId;
        }
    }
}
