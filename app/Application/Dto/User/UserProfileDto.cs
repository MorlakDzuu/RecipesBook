using System.Collections.Generic;

namespace Application.Dto.User
{
    public class UserProfileDto
    {
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
        public int RecipesCount { get; set; }
        public int LikesCount { get; set; }
        public int FavoritesCount { get; set; }
        public List<RecipeFeedDto> Recipes { get; set; }
    }
}
