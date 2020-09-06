using System.Web;
using System.Web.Optimization;

namespace GKAS
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = true;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

        

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            //Master page script
            bundles.Add(new ScriptBundle("~/bundles/SiteScript").Include(
                        //"~/Scripts/AppConstants.js",
                        "~/Scripts/ServiceManager.js",
                        "~/Scripts/SiteScript.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/TestAttemptManager").Include(
                      "~/Scripts/countdowntimer.js",
                      "~/Scripts/TestAttemptManager.js"));


            //Kendo UI script bundle
            bundles.Add(new ScriptBundle("~/bundles/KendoScript").Include(
                        "~/Scripts/kendo/kendo.all.min.js",
                        "~/Scripts/kendo/kendo.aspnetmvc.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/fontawesome-all.min.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
                       "~/Content/kendo/kendo.dataviz.default.min.css",
                       "~/Content/kendo/kendo.common.min.css",
                       "~/Content/kendo/kendo.rtl.min.css",
                       "~/Content/kendo/kendo.dataviz.min.css",
                       "~/Content/kendo/kendo.blueopal.min.css",
                       //"~/Content/kendo/kendo.kips.css",
                       "~/Content/kendo/kendo.dataviz.blueopal.min.css"));
        }
    }
}
