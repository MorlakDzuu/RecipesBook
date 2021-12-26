using Domain.Recipe;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infastructure.Configuration
{
    public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
    {
        public void Configure( EntityTypeBuilder<Recipe> builder )
        {
            builder.Property( item => item.Id )
                .IsRequired()
                .HasColumnName( "id" );

            builder.HasKey( item => item.Id );

            builder.Property( item => item.Title )
                .IsRequired()
                .HasMaxLength( 200 )
                .HasColumnName("title");

            builder.Property( item => item.Description ) 
                .IsRequired()
                .HasMaxLength( 500 )
                .HasColumnName( "description" );

            builder.Property( item => item.CookingTime )
                .IsRequired()
                .HasColumnName( "cooking_time" );

            builder.Property(item => item.PortionsCount)
                .IsRequired()
                .HasColumnName( "portions_count" );

            builder.Property( item => item.PhotoUrl )
                .IsRequired()
                .HasColumnName( "photo_url" );

            builder.Property( item => item.UserId )
                .IsRequired()
                .HasColumnName( "user_id" );

            builder.Property( item => item.Stages )
                .HasColumnName( "stages" )
                .HasConversion( item => JsonConvert.SerializeObject( item, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ),
                                item => JsonConvert.DeserializeObject<List<Stage>>( item, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ),
                                new ValueComparer<List<Stage>>( ( stage1, stage2 ) => stage1.SequenceEqual( stage2 ), stage => 
                                stage.Aggregate( 0, ( number, stageHash ) => HashCode.Combine( number, stageHash.GetHashCode() )), stage => stage.ToList() ) );

            builder.Property( item => item.Ingredients )
                .HasColumnName( "ingredients" )
                .HasConversion( item => JsonConvert.SerializeObject( item, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ),
                                item => JsonConvert.DeserializeObject<List<Ingredient>>( item, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore } ),
                                new ValueComparer<List<Ingredient>>( ( ingredient1, ingredient2 ) => ingredient1.SequenceEqual( ingredient2 ), ingredient =>
                                ingredient.Aggregate( 0, ( number, ingredientHash ) => HashCode.Combine( number, ingredientHash.GetHashCode() ) ), ingredient => ingredient.ToList() ) );
        }
    }
}
