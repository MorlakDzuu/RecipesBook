using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.User;
using Extranet.Api.Auth;

namespace Application.Service
{
    public interface IAuthService
    {
        public Task<ClaimsIdentity> GetIdentityAsync( string login, string password );
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService( IUserRepository userRepository )
        {
            _userRepository = userRepository;
        }

        public async Task<ClaimsIdentity> GetIdentityAsync( string login, string password )
        {
            User user = await _userRepository.GetByLoginAsync( login );

            if ( user != null && HashUtil.VerifyHashedPassword( Convert.FromBase64String( user.Password ), password ) )
            {
                var claims = new List<Claim>
                {
                    new Claim( ClaimTypes.NameIdentifier, user.Id.ToString() )
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity( claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType );
                return claimsIdentity;
            }

            return null;
        }
    }
}
