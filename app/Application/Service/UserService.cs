using Application.Dto;
using Application.Dto.User;
using Domain.Label;
using Domain.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Service
{
    public interface IUserService
    {
        public Task<List<UserDto>> GetAllAsync();
        public Task AddAsync( UserRegistrationDto userRegistrationDto );
        public Task<UserDto> GetByLoginAsync( string login );
        public Task<UserProfileDto> GetUserProfileInfoAsync( int userId );
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILabelRepository _labelRepository;
        private readonly IRecipeService _recipeService;

        public UserService( IUserRepository userRepository, ILabelRepository labelRepository, IRecipeService recipeService )
        {
            _userRepository = userRepository;
            _labelRepository = labelRepository;
            _recipeService = recipeService;
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            List<User> users = await _userRepository.GetAllAsync();
            return users.ConvertAll( item => new UserDto() { Name = item.Name, Login = item.Login, Description = item.Description } );
        }

        public async Task AddAsync( UserRegistrationDto userRegistrationDto )
        {
            User user = new User( userRegistrationDto.Name, userRegistrationDto.Login, userRegistrationDto.Password );
            await _userRepository.AddUserAsync( user );
        }

        public async Task<UserDto> GetByLoginAsync( string login )
        {
            User user = await _userRepository.GetByLoginAsync( login );
            return new UserDto
            {
                Name = user.Name,
                Login = user.Login,
                Description = user.Description
            };
        }

        public async Task<UserProfileDto> GetUserProfileInfoAsync( int userId )
        {
            User user = await _userRepository.GetAsync( userId );
            int likesCount = await _labelRepository.GetLikeCountByUserIdAsync( userId );
            int favoritesCount = await _labelRepository.GetFvoriteCountByUserIdAsync( userId );
            List<RecipeFeedDto> recipesFeed = await _recipeService.GetRecipesFeedByUserIdAsync( userId );

            return new UserProfileDto
            {
                Name = user.Name,
                Login = user.Login,
                Description = user.Description,
                LikesCount = likesCount,
                FavoritesCount = favoritesCount,
                RecipesCount = recipesFeed.Count,
                Recipes = recipesFeed
            };
        }
    }
}
