using System.Collections.Generic;


namespace Domain.Recipe
{
    public class Recipe
    {
        public int Id { get; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CookingTime { get; set; }
        public int PortionsCount { get; set; }
        public string PhotoUrl { get; set; }
        public List<Stage> Stages { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public int UserId { get; set; }

        public Recipe(
            string title,
            string description,
            int cookingTime,
            int portionsCount,
            string photoUrl,
            List<Stage> stages,
            List<Ingredient> ingredients,
            int userId
            )
        {
            Title = title;
            Description = description;
            CookingTime = cookingTime;
            PortionsCount = portionsCount;
            PhotoUrl = photoUrl;
            Stages = stages;
            Ingredients = ingredients;
            UserId = userId;
        }

        public void AddStage( Stage stage )
        {
            Stages.Add( stage );
        }

        public void RemoveStage( Stage stage )
        {
            Stages.Remove( stage );
        }

        public void AddIngredient( Ingredient ingredient )
        {
            Ingredients.Add( ingredient );
        }

        public void RemoveIngredient( Ingredient ingredient )
        {
            Ingredients.Remove( ingredient );
        }
    }
}
