using Demoblaze.Auto.SetUp;
using Demoblaze.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using Demoblaze.Auto.Webpages;

namespace Demoblaze.Auto.WebPages
{
    public class LoginPage : CommonPage
    {
        public LoginPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement txtAreaLoginUsername
        {
            get { return WebDriver.FindElementById("loginusername"); }
        }
        private IWebElement txtAreaLoginPassword
        {
            get { return WebDriver.FindElementById("loginpassword"); }
        }
        private IWebElement btnSendLogin
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Log in']"); }
        }
        

        public LoginPage FillformClick()
        {
            txtAreaLoginUsername.SendKeys("Marc");
            txtAreaLoginPassword.SendKeys("1234");
            btnSendLogin.Click();
            return this;
        }
        
    }
}
