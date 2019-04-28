namespace MobilePlatformMobileClient
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
            this.btnLogin = new System.Windows.Forms.Button();
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtAuthority = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtUsername = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.btnRequestScanLogin = new System.Windows.Forms.Button();
            this.txtQrCode = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.btnTempToken = new System.Windows.Forms.Button();
            this.txtTempToken = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnLogin);
            this.groupBox1.Controls.Add(this.txtPassword);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.txtAuthority);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.txtUsername);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Top;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(800, 59);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "登录";
            // 
            // btnLogin
            // 
            this.btnLogin.Location = new System.Drawing.Point(704, 19);
            this.btnLogin.Name = "btnLogin";
            this.btnLogin.Size = new System.Drawing.Size(75, 23);
            this.btnLogin.TabIndex = 2;
            this.btnLogin.Text = "登录";
            this.btnLogin.UseVisualStyleBackColor = true;
            this.btnLogin.Click += new System.EventHandler(this.btnLogin_ClickAsync);
            // 
            // txtPassword
            // 
            this.txtPassword.Location = new System.Drawing.Point(585, 19);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.PasswordChar = '*';
            this.txtPassword.Size = new System.Drawing.Size(100, 20);
            this.txtPassword.TabIndex = 1;
            this.txtPassword.Text = "secret";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(536, 22);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(31, 13);
            this.label2.TabIndex = 0;
            this.label2.Text = "密码";
            // 
            // txtAuthority
            // 
            this.txtAuthority.Location = new System.Drawing.Point(63, 22);
            this.txtAuthority.Name = "txtAuthority";
            this.txtAuthority.Size = new System.Drawing.Size(291, 20);
            this.txtAuthority.TabIndex = 1;
            this.txtAuthority.Text = "http://localhost:10103";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(14, 25);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(31, 13);
            this.label3.TabIndex = 0;
            this.label3.Text = "地址";
            // 
            // txtUsername
            // 
            this.txtUsername.Location = new System.Drawing.Point(420, 19);
            this.txtUsername.Name = "txtUsername";
            this.txtUsername.Size = new System.Drawing.Size(100, 20);
            this.txtUsername.TabIndex = 1;
            this.txtUsername.Text = "user1";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(371, 22);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(43, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "用户名";
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location = new System.Drawing.Point(0, 59);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(800, 391);
            this.tabControl1.TabIndex = 1;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.btnRequestScanLogin);
            this.tabPage1.Controls.Add(this.txtQrCode);
            this.tabPage1.Controls.Add(this.label4);
            this.tabPage1.Location = new System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(792, 365);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "扫码登录";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // btnRequestScanLogin
            // 
            this.btnRequestScanLogin.Location = new System.Drawing.Point(396, 16);
            this.btnRequestScanLogin.Name = "btnRequestScanLogin";
            this.btnRequestScanLogin.Size = new System.Drawing.Size(120, 23);
            this.btnRequestScanLogin.TabIndex = 4;
            this.btnRequestScanLogin.Text = "请求ScanLogin";
            this.btnRequestScanLogin.UseVisualStyleBackColor = true;
            this.btnRequestScanLogin.Click += new System.EventHandler(this.btnRequestScanLogin_ClickAsync);
            // 
            // txtQrCode
            // 
            this.txtQrCode.Location = new System.Drawing.Point(83, 18);
            this.txtQrCode.Name = "txtQrCode";
            this.txtQrCode.Size = new System.Drawing.Size(291, 20);
            this.txtQrCode.TabIndex = 3;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(10, 21);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(67, 13);
            this.label4.TabIndex = 2;
            this.label4.Text = "二维码文本";
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.btnTempToken);
            this.tabPage2.Controls.Add(this.txtTempToken);
            this.tabPage2.Controls.Add(this.label5);
            this.tabPage2.Location = new System.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(792, 365);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "获取临时密码";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // btnTempToken
            // 
            this.btnTempToken.Location = new System.Drawing.Point(405, 15);
            this.btnTempToken.Name = "btnTempToken";
            this.btnTempToken.Size = new System.Drawing.Size(120, 23);
            this.btnTempToken.TabIndex = 7;
            this.btnTempToken.Text = "请求TempToken";
            this.btnTempToken.UseVisualStyleBackColor = true;
            this.btnTempToken.Click += new System.EventHandler(this.btnTempToken_Click);
            // 
            // txtTempToken
            // 
            this.txtTempToken.Location = new System.Drawing.Point(92, 17);
            this.txtTempToken.Name = "txtTempToken";
            this.txtTempToken.ReadOnly = true;
            this.txtTempToken.Size = new System.Drawing.Size(291, 20);
            this.txtTempToken.TabIndex = 6;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(19, 20);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(55, 13);
            this.label5.TabIndex = 5;
            this.label5.Text = "临时密码";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.groupBox1);
            this.Name = "MainForm";
            this.Text = "Form1";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.tabPage2.ResumeLayout(false);
            this.tabPage2.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btnLogin;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtUsername;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.TextBox txtAuthority;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtQrCode;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button btnRequestScanLogin;
        private System.Windows.Forms.Button btnTempToken;
        private System.Windows.Forms.TextBox txtTempToken;
        private System.Windows.Forms.Label label5;
    }
}

