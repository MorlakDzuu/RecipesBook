using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Tag
{
    public interface ITagRepository
    {
        public Task AddTagAsync( Tag tag );
        public Task AddTagToRecipeAsync( TagToRecipe tagToRecipe );
        public Task DeleteTagAsync( int tagId );
        public Task<Tag> GetTagByNameAsync( string name );
        public Task<List<Tag>> GetAllTagsAsync();
        public Task<List<Tag>> GetTagsByStringAsync( string start );
        public Task<List<Tag>> GetTagsByRecipeIdAsync( int recipeId );
        public Task DeleteTagFromRecipeAsync( string name, int recipeId );
        public Task<bool> IsTagToRecipeExistAsync( int tagId, int recipeId );
    }
}
