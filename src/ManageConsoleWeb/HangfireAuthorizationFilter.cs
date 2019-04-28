using Hangfire.Dashboard;

namespace ManageConsoleWeb
{
    public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        public bool Authorize(DashboardContext context)
        {
            var httpContext = context.GetHttpContext();

            // Allow all authenticated users to see the Dashboard (potentially dangerous).
            return httpContext.User.Identity.IsAuthenticated
                && httpContext.User.Identity.Name == "sso_admin";
        }
    }
}
