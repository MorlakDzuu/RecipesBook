using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Recipe
{
    public interface IRecipeRepository
    {
        public Task<Recipe> GetAsync( int id );
        public Task<List<Recipe>> GetAllAsync();
        public Task<List<Recipe>> GetUsingPaginationAsync( int pageNumber, int pageSize, int? userId = null, string searchString = null, bool isFavorite = false );
        public Task AddAsync( Recipe recipe );
        public Task<List<int>> GetAllIdsAsync();
        public Task DeleteAsync( int id );
        public Task<Recipe> GetRecipeOfDay();
        public Task<List<Recipe>> GetByUserIdAsync( int userId );
    }
}
