using MassTransit;
using System;
using System.Collections.Generic;
using System.Text;

namespace SsoUnitTests
{
    public class BusFactory
    {
        public static IBusControl Create() => Bus.Factory.CreateUsingInMemory(cfg => { });
    }
}
