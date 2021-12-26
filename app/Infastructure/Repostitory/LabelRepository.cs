using Domain.Label;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infastructure.Repostitory
{
    public class LabelRepository : ILabelRepository
    {
        private readonly DbSet<Label> _labelDbSet;

        public LabelRepository( ApplicationContext applicationContext )
        {
            _labelDbSet = applicationContext.Set<Label>();
        }

        public async Task AddFavoriteAsync( int userId, int recipeId )
        {
            Label label = new Label( userId, recipeId, LabelTypes.Favorite );
            await _labelDbSet.AddAsync( label );
        }

        public async Task AddLikeAsync( int userId, int recipeId )
        {
            Label label = new Label( userId, recipeId, LabelTypes.Like );
            await _labelDbSet.AddAsync( label );
        }

        public async Task<int> GetFavoriteCountByRecipeIdAsync( int recipeId )
        {
            return await _labelDbSet.Where( item => ( item.RecipeId == recipeId ) && ( item.Type == LabelTypes.Favorite ) ).CountAsync();
        }

        public async Task<int> GetLikeCountByRecipeIdAsync( int recipeId )
        {
            return await _labelDbSet.Where( item => ( item.RecipeId == recipeId ) && ( item.Type == LabelTypes.Like ) ).CountAsync();
        }

        public async Task<bool> IsRecipeLikedByUser( int recipeId, int userId )
        {
            Label label = await _labelDbSet.Where( item => ( item.RecipeId == recipeId ) && ( item.UserId == userId ) && ( item.Type == LabelTypes.Like ) ).SingleOrDefaultAsync();

            if ( label == null )
                return false;
            return true;
        }

        public async Task<bool> IsRecipeFavoriteByUser(int recipeId, int userId)
        {
            Label label = await _labelDbSet.Where( item => ( item.RecipeId == recipeId ) && ( item.UserId == userId ) && ( item.Type == LabelTypes.Favorite ) ).SingleOrDefaultAsync();

            if ( label == null )
                return false;
            return true;
        }

        public async Task DeleteFavoriteAsync( int userId, int recipeId )
        {
            Label label = await _labelDbSet.Where( item => ( item.UserId == userId ) && ( item.RecipeId == recipeId ) && ( item.Type == LabelTypes.Favorite ) ).SingleOrDefaultAsync();
            _labelDbSet.Remove( label );
        }

        public async Task DeleteLikeAsync( int userId, int recipeId )
        {
            Label label = await _labelDbSet.Where( item => ( item.UserId == userId ) && ( item.RecipeId == recipeId ) && ( item.Type == LabelTypes.Like ) ).SingleOrDefaultAsync();
            _labelDbSet.Remove( label );
        }

        public async Task<int> GetLikeCountByUserIdAsync( int userId )
        {
            return await _labelDbSet.Where( item => ( item.UserId == userId ) && ( item.Type == LabelTypes.Like ) ).CountAsync();
        }

        public async Task<int> GetFvoriteCountByUserIdAsync( int userId )
        {
            return await _labelDbSet.Where( item => ( item.UserId == userId ) && ( item.Type == LabelTypes.Favorite ) ).CountAsync();
        }
    }
}
