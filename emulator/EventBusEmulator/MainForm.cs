using EventBusEmulator.Consumers;
using MassTransit;
using OM.Base.Sso.Messages;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EventBusEmulator
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            FormClosing += MainForm_FormClosing;
        }

        private void MainForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (_bus != null) _bus.Stop();
        }

        private IBusControl _bus;
        private void btnConnect_Click(object sender, EventArgs e)
        {
            _bus = CreateBus();
            _bus.Start();
            MessageBox.Show("OK");
        }

        private IBusControl CreateBus()
        {
            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                var host = cfg.Host(new Uri(txtAddress.Text), h =>
                {
                    h.Username(txtUsername.Text);
                    h.Password(txtPassword.Text);
                });

                cfg.ReceiveEndpoint(host, "OM.Base.Csi.SmsService", c =>
                {
                    c.Consumer(() => new UserBatchSyncConsumer(this));
                });
            });
        }

        public void PrintResult(string txt)
        {
            Invoke((MethodInvoker)delegate
            {
                txtResult.Text = txt;
            });
        }

        private Guid _pullUsersCommandId;
        private void btnPullUsers_Click(object sender, EventArgs e)
        {
            //_pullUsersCommandId = Guid.NewGuid();
            //_bus.Publish(new PullUsersCommand
            //{
            //    CommandId = _pullUsersCommandId,
            //    StartCreated = chkStartTime.Checked ? new DateTimeOffset(dtpStart.Value) : default(DateTimeOffset?),
            //    EndCreated = chkEndTime.Checked ? new DateTimeOffset(dtpEnd.Value) : default(DateTimeOffset?),
            //});
        }
    }
}
