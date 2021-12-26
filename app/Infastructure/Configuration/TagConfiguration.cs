using Domain.Tag;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infastructure.Configuration
{
    public class TagConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure( EntityTypeBuilder<Tag> builder )
        {
            builder.Property( item => item.Id )
                .IsRequired()
                .HasColumnName( "id" );

            builder.HasKey( item => item.Id );

            builder.Property( item => item.Name )
                .IsRequired()
                .HasMaxLength( 60 )
                .HasColumnName( "name" );

            builder.HasIndex( item => item.Name ).IsUnique();
        }
    }
}
