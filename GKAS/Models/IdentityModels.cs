using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace GKAS.Models
{
    public class ApplicationUserClaim : IdentityUserClaim<long> { }

    public class ApplicationUserLogin : IdentityUserLogin<long> { }

    public class ApplicationUserRole : IdentityUserRole<long> { }

    public class ApplicationRole : IdentityRole<long, ApplicationUserRole>
    {
    }
    public class ApplicationUserStore : UserStore<ApplicationUser, ApplicationRole, long, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>
    {
        public ApplicationUserStore(ApplicationDbContext context) : base(context)
        {
        }
    }

    public class ApplicationRoleStore : RoleStore<ApplicationRole, long, ApplicationUserRole>
    {
        public ApplicationRoleStore(ApplicationDbContext context) : base(context)
        {
        }
    }

    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser<long, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser, long> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            // userIdentity.AddClaim(new Claim("TenantId", this.TenantId.ToString())); this.TenantId should be in applicationUser class
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, long, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}