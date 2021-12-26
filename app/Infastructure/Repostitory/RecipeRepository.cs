using Domain.Label;
using Domain.Recipe;
using Domain.Tag;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infastructure.Repostitory
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly DbSet<Recipe> _recipesDbSet;
        private readonly DbSet<TagToRecipe> _tagToRecipesDbSet;
        private readonly DbSet<Tag> _tagsDbSet;
        private readonly DbSet<Label> _labelDbSet;

        public RecipeRepository( ApplicationContext applicationContext )
        {
            _recipesDbSet = applicationContext.Set<Recipe>();
            _tagToRecipesDbSet = applicationContext.Set<TagToRecipe>();
            _tagsDbSet = applicationContext.Set<Tag>();
            _labelDbSet = applicationContext.Set<Label>();
        }

        public async Task AddAsync( Recipe recipe )
        {
            await _recipesDbSet.AddAsync( recipe );
        }

        public async Task DeleteAsync( int id )
        {
            Recipe recipe = await GetAsync( id );
            _recipesDbSet.Remove( recipe );
        }

        public async Task<List<Recipe>> GetAllAsync()
        {
            return await _recipesDbSet.ToListAsync();
        }

        public async Task<List<int>> GetAllIdsAsync()
        {
            return await _recipesDbSet.Select( recipe => recipe.Id ).ToListAsync();
        }

        public async Task<Recipe> GetAsync( int id )
        {
            return await _recipesDbSet.Where( item => item.Id == id ).SingleOrDefaultAsync();
        }

        public async Task<List<Recipe>> GetByUserIdAsync( int userId )
        {
            return await _recipesDbSet.Where( item => item.UserId == userId ).ToListAsync();
        }

        public async Task<Recipe> GetRecipeOfDay()
        {
            return await _recipesDbSet.OrderBy( item => item.Title ).FirstOrDefaultAsync();
        }

        public async Task<List<Recipe>> GetUsingPaginationAsync( 
            int pageNumber, 
            int pageSize, 
            int? userId = null, 
            string searchString = null, 
            bool isFavorite = false )
        {
            var query = _recipesDbSet.AsQueryable();

            if ( userId != null )
            {
                query = query.Where( item => item.UserId == userId );
            }

            if ( searchString != null )
            {
                List<int> recipesIdsByTitle = await query
                    .Where( item => item.Title.Contains( searchString ) )
                    .Select( item => item.Id )
                    .ToListAsync();

                List<int> tagsIdsByName = await _tagsDbSet
                    .Where( item => item.Name.Contains( searchString ) )
                    .Select( item => item.Id )
                    .ToListAsync();

                List<int> recipesIdsByTag = await _tagToRecipesDbSet
                    .Where( item => tagsIdsByName.Contains( item.TagId ) )
                    .Select( item => item.RecipeId )
                    .Distinct()
                    .ToListAsync();

                List<int> resultIds = recipesIdsByTitle
                    .Concat( recipesIdsByTag )
                    .Distinct()
                    .ToList();

                query = query.Where( item => resultIds.Contains( item.Id ) );
            }

            if ( isFavorite )
            {
                List<int> recipesIds = await _labelDbSet.Where( item => ( item.UserId == userId ) && ( item.Type == LabelTypes.Favorite ) ).Select( item => item.RecipeId ).ToListAsync();

                query = query.Where( item => recipesIds.Contains( item.Id ) );
            }

            return await query.Skip( pageSize * ( pageNumber - 1 ) ).Take( pageSize ).ToListAsync();
        }
    }
}
