namespace Domain.User
{
    public class User
    {
        public int Id { get; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Description { get; set; }
        public string Password { get; set; }

        public User( string name, string login, string password, string description = null )
        {
            Name = name;
            Login = login;
            Description = description;
            Password = password;
        }
    }
}
