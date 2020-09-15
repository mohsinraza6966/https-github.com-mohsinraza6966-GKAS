using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GKAS.Startup))]
namespace GKAS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
