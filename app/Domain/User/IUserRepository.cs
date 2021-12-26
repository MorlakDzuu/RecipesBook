using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.User
{
    public interface IUserRepository
    {
        public Task<User> GetAsync( int id );
        public Task<List<User>> GetAllAsync();
        public Task AddUserAsync( User user );
        public Task<User> GetByLoginAsync( string login );
        public Task<string> GetLoginByRecipeId( int id );
    }
}
