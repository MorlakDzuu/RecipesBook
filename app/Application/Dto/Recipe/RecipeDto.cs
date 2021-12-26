using Application.Dto.Recipe;
using System.Collections.Generic;

namespace Application.Dto
{
    public class RecipeDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CookingDuration { get; set; }
        public int PortionsCount { get; set; }
        public string PhotoUrl { get; set; }
        public List<string> Tags { get; set; }
        public List<StageDto> Stages { get; set; }
        public List<IngredientDto> Ingredients { get; set; }
    }
}
