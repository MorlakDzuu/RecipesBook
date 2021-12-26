using Application.Dto.Recipe;
using System.Collections.Generic;

namespace Application.Dto
{
    public class RecipePageDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CookingDuration { get; set; }
        public int PortionsCount { get; set; }
        public string PhotoUrl { get; set; }
        public int FavoritesCount { get; set; }
        public int LikesCount { get; set; }
        public List<string> Tags { get; set; }
        public bool IsLiked { get; set; }
        public bool IsFavorite { get; set; }
        public bool IsMyRecipe { get; set; }
        public string AuthorLogin { get; set; }
        public List<IngredientDto> Ingredients { get; set; }
        public List<StageDto> Stages { get; set; }
    }
}
