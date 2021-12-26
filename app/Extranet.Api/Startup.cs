using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Domain.User;
using Infastructure.Repostitory;
using Application.Service;
using Infastructure;
using Microsoft.EntityFrameworkCore;
using Domain.Recipe;
using Domain.Tag;
using Domain.Label;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Extranet.Api.Auth;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Extranet.API
{
    public class Startup
    {
        public Startup( IConfiguration configuration )
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices( IServiceCollection services )
        {
            services.AddControllersWithViews();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IRecipeRepository, RecipeRepository>();
            services.AddScoped<IRecipeService, RecipeService>();

            services.AddScoped<ITagRepository, TagRepository>();
            services.AddScoped<ITagService, TagService>();

            services.AddScoped<ILabelRepository, LabelRepository>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddDbContext<ApplicationContext>( options => options.UseNpgsql( Configuration.GetSection( "ConnectionString" ).Value ) );
            services.AddScoped<IUnitOfWork>( sp => sp.GetService<ApplicationContext>() );

            services.AddSession( options => {
                options.IdleTimeout = TimeSpan.FromMinutes( 15 );
            } );

            services.AddAuthentication( auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            } )
                    .AddJwtBearer( options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = AuthOptions.ISSUER,
                            ValidateAudience = true,
                            ValidAudience = AuthOptions.AUDIENCE,
                            ValidateLifetime = true,
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            ValidateIssuerSigningKey = true,
                        };

                        options.Events = new JwtBearerEvents()
                        {
                            OnAuthenticationFailed = c =>
                            {
                                c.NoResult();
                                c.Response.StatusCode = 403;
                                c.Response.ContentType = "text/plain";
                                c.Response.WriteAsync( "Не удалось аутентифицировать пользователя" ).Wait();
                                return Task.CompletedTask;
                            },
                            OnChallenge = c =>
                            {
                                c.HandleResponse();
                                return Task.CompletedTask;
                            }
                        };
                    } );

            services.AddSpaStaticFiles( configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            } );
        }

        public void Configure( IApplicationBuilder app, IWebHostEnvironment env )
        {
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler( "/Error" );
            }

            app.UseStaticFiles();
            if ( !env.IsDevelopment() )
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseSession();

            app.Use( async ( context, next ) =>
            {
                var JWToken = context.Session.GetString( "JWToken" );
                if ( !string.IsNullOrEmpty( JWToken ) )
                {
                    context.Request.Headers.Add( "Authorization", "Bearer " + JWToken );
                }
                await next();
            } );

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints( endpoints => { endpoints.MapControllers(); } );

            app.UseSpa( spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if ( env.IsDevelopment() )
                {
                    spa.UseAngularCliServer( npmScript: "start" );
                }
            } );
        }
    }
}
