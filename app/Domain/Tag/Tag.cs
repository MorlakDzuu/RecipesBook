namespace Domain.Tag
{
    public class Tag
    {
        public int Id { get; }
        public string Name { get; set; }

        public Tag( string name )
        {
            Name = name;
        }
    }
}
