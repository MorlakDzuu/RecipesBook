using System.Threading.Tasks;

namespace Infastructure
{
    public interface IUnitOfWork
    {
        public Task Commit();
    }
}
