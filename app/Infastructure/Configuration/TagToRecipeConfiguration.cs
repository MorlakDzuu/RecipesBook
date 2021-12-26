using Domain.Tag;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infastructure.Configuration
{
    public class TagToRecipeConfiguration : IEntityTypeConfiguration<TagToRecipe>
    {
        public void Configure(EntityTypeBuilder<TagToRecipe> builder)
        {
            builder.Property( item => item.TagId )
                .IsRequired()
                .HasColumnName( "tag_id" );

            builder.Property( item => item.RecipeId )
                .IsRequired()
                .HasColumnName( "recipe_id" );

            builder.HasKey( item => new { item.TagId, item.RecipeId } );
        }
    }
}
