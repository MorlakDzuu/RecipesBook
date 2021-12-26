using Domain.Label;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infastructure.Configuration
{
    public class LabelConfiguration : IEntityTypeConfiguration<Label>
    {
        public void Configure( EntityTypeBuilder<Label> builder )
        {
            builder.Property( item => item.UserId )
               .IsRequired()
               .HasColumnName( "user_id" );

            builder.Property( item => item.RecipeId )
                .IsRequired()
                .HasColumnName( "recipe_id" );

            builder.Property( item => item.Type )
                .IsRequired()
                .HasColumnName( "type" );

            builder.HasKey( item => new { item.UserId, item.RecipeId, item.Type } );
        }
    }
}
