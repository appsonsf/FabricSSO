using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageConsoleWeb
{
    public class HangfireJobActivatorWithServiceProvider : Hangfire.JobActivator
    {
        private readonly IServiceProvider _serviceProvider;
        public HangfireJobActivatorWithServiceProvider(IServiceProvider serviceProvider) => _serviceProvider = serviceProvider;

        public override object ActivateJob(Type jobType)
        {
            return _serviceProvider.GetService(jobType);
        }
    }
}
