namespace EventBusEmulator
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btnConnect = new System.Windows.Forms.Button();
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtAddress = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtUsername = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.dtpEnd = new System.Windows.Forms.DateTimePicker();
            this.chkEndTime = new System.Windows.Forms.CheckBox();
            this.dtpStart = new System.Windows.Forms.DateTimePicker();
            this.chkStartTime = new System.Windows.Forms.CheckBox();
            this.btnPullUsers = new System.Windows.Forms.Button();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.btn_AdSend = new System.Windows.Forms.Button();
            this.txt_Bizdata = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.txtResult = new System.Windows.Forms.TextBox();
            this.groupBox1.SuspendLayout();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnConnect);
            this.groupBox1.Controls.Add(this.txtPassword);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.txtAddress);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.txtUsername);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox1.Size = new System.Drawing.Size(1067, 68);
            this.groupBox1.TabIndex = 2;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "连接";
            // 
            // btnConnect
            // 
            this.btnConnect.Location = new System.Drawing.Point(939, 22);
            this.btnConnect.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.btnConnect.Name = "btnConnect";
            this.btnConnect.Size = new System.Drawing.Size(100, 27);
            this.btnConnect.TabIndex = 2;
            this.btnConnect.Text = "连接";
            this.btnConnect.UseVisualStyleBackColor = true;
            this.btnConnect.Click += new System.EventHandler(this.btnConnect_Click);
            // 
            // txtPassword
            // 
            this.txtPassword.Location = new System.Drawing.Point(780, 22);
            this.txtPassword.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.PasswordChar = '*';
            this.txtPassword.Size = new System.Drawing.Size(132, 25);
            this.txtPassword.TabIndex = 1;
            this.txtPassword.Text = "guest";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(715, 25);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(37, 15);
            this.label2.TabIndex = 0;
            this.label2.Text = "密码";
            // 
            // txtAddress
            // 
            this.txtAddress.Location = new System.Drawing.Point(84, 25);
            this.txtAddress.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.txtAddress.Name = "txtAddress";
            this.txtAddress.Size = new System.Drawing.Size(387, 25);
            this.txtAddress.TabIndex = 1;
            this.txtAddress.Text = "rabbitmq://localhost/";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(19, 29);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(37, 15);
            this.label3.TabIndex = 0;
            this.label3.Text = "地址";
            // 
            // txtUsername
            // 
            this.txtUsername.Location = new System.Drawing.Point(560, 22);
            this.txtUsername.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.txtUsername.Name = "txtUsername";
            this.txtUsername.Size = new System.Drawing.Size(132, 25);
            this.txtUsername.TabIndex = 1;
            this.txtUsername.Text = "guest";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(495, 25);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(52, 15);
            this.label1.TabIndex = 0;
            this.label1.Text = "用户名";
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(4, 21);
            this.tabControl1.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(1059, 134);
            this.tabControl1.TabIndex = 3;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.dtpEnd);
            this.tabPage1.Controls.Add(this.chkEndTime);
            this.tabPage1.Controls.Add(this.dtpStart);
            this.tabPage1.Controls.Add(this.chkStartTime);
            this.tabPage1.Controls.Add(this.btnPullUsers);
            this.tabPage1.Location = new System.Drawing.Point(4, 25);
            this.tabPage1.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.tabPage1.Size = new System.Drawing.Size(1051, 105);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "拉取系统用户";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // dtpEnd
            // 
            this.dtpEnd.Location = new System.Drawing.Point(443, 20);
            this.dtpEnd.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.dtpEnd.Name = "dtpEnd";
            this.dtpEnd.Size = new System.Drawing.Size(157, 25);
            this.dtpEnd.TabIndex = 6;
            // 
            // chkEndTime
            // 
            this.chkEndTime.AutoSize = true;
            this.chkEndTime.Location = new System.Drawing.Point(323, 22);
            this.chkEndTime.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.chkEndTime.Name = "chkEndTime";
            this.chkEndTime.Size = new System.Drawing.Size(89, 19);
            this.chkEndTime.TabIndex = 5;
            this.chkEndTime.Text = "结束日期";
            this.chkEndTime.UseVisualStyleBackColor = true;
            // 
            // dtpStart
            // 
            this.dtpStart.Location = new System.Drawing.Point(133, 21);
            this.dtpStart.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.dtpStart.Name = "dtpStart";
            this.dtpStart.Size = new System.Drawing.Size(157, 25);
            this.dtpStart.TabIndex = 6;
            // 
            // chkStartTime
            // 
            this.chkStartTime.AutoSize = true;
            this.chkStartTime.Location = new System.Drawing.Point(13, 23);
            this.chkStartTime.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.chkStartTime.Name = "chkStartTime";
            this.chkStartTime.Size = new System.Drawing.Size(89, 19);
            this.chkStartTime.TabIndex = 5;
            this.chkStartTime.Text = "开始日期";
            this.chkStartTime.UseVisualStyleBackColor = true;
            // 
            // btnPullUsers
            // 
            this.btnPullUsers.Location = new System.Drawing.Point(657, 18);
            this.btnPullUsers.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.btnPullUsers.Name = "btnPullUsers";
            this.btnPullUsers.Size = new System.Drawing.Size(160, 27);
            this.btnPullUsers.TabIndex = 4;
            this.btnPullUsers.Text = "请求";
            this.btnPullUsers.UseVisualStyleBackColor = true;
            this.btnPullUsers.Click += new System.EventHandler(this.btnPullUsers_Click);
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.btn_AdSend);
            this.tabPage2.Controls.Add(this.txt_Bizdata);
            this.tabPage2.Controls.Add(this.label4);
            this.tabPage2.Location = new System.Drawing.Point(4, 25);
            this.tabPage2.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.tabPage2.Size = new System.Drawing.Size(1051, 105);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "tabPage2";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // btn_AdSend
            // 
            this.btn_AdSend.Location = new System.Drawing.Point(402, 18);
            this.btn_AdSend.Name = "btn_AdSend";
            this.btn_AdSend.Size = new System.Drawing.Size(75, 23);
            this.btn_AdSend.TabIndex = 2;
            this.btn_AdSend.Text = "发送";
            this.btn_AdSend.UseVisualStyleBackColor = true;
            // 
            // txt_Bizdata
            // 
            this.txt_Bizdata.Location = new System.Drawing.Point(83, 18);
            this.txt_Bizdata.Name = "txt_Bizdata";
            this.txt_Bizdata.Size = new System.Drawing.Size(294, 25);
            this.txt_Bizdata.TabIndex = 1;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(14, 21);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(63, 15);
            this.label4.TabIndex = 0;
            this.label4.Text = "BizData";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.tabControl1);
            this.groupBox2.Dock = System.Windows.Forms.DockStyle.Top;
            this.groupBox2.Location = new System.Drawing.Point(0, 68);
            this.groupBox2.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Padding = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox2.Size = new System.Drawing.Size(1067, 158);
            this.groupBox2.TabIndex = 4;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "操作";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.txtResult);
            this.groupBox3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox3.Location = new System.Drawing.Point(0, 226);
            this.groupBox3.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Padding = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.groupBox3.Size = new System.Drawing.Size(1067, 293);
            this.groupBox3.TabIndex = 5;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "结果";
            // 
            // txtResult
            // 
            this.txtResult.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtResult.Location = new System.Drawing.Point(4, 21);
            this.txtResult.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.txtResult.Multiline = true;
            this.txtResult.Name = "txtResult";
            this.txtResult.Size = new System.Drawing.Size(1059, 269);
            this.txtResult.TabIndex = 0;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1067, 519);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Margin = new System.Windows.Forms.Padding(4, 3, 4, 3);
            this.Name = "MainForm";
            this.Text = "Form1";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.tabPage2.ResumeLayout(false);
            this.tabPage2.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btnConnect;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtAddress;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtUsername;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.Button btnPullUsers;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.DateTimePicker dtpEnd;
        private System.Windows.Forms.CheckBox chkEndTime;
        private System.Windows.Forms.DateTimePicker dtpStart;
        private System.Windows.Forms.CheckBox chkStartTime;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.TextBox txtResult;
        private System.Windows.Forms.Button btn_AdSend;
        private System.Windows.Forms.TextBox txt_Bizdata;
        private System.Windows.Forms.Label label4;
    }
}

