using Opencart.Auto.Common;
using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace Opencart.Auto.WebPages
{
    public class LoginPage : CommonPage
    {
        public LoginPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement inputEmail
        {
            get { return WebDriver.FindElementById("input-email"); }
        }
        private IWebElement inputPassword
        {
            get { return WebDriver.FindElementById("input-password"); }
        }
        private IWebElement btnLogin
        {
            get { return WebDriver.FindElementByXPath("//input[@value='Login']"); }
        }
        public LoginPage FillLogin(string newUser, string pass)
        {
            inputEmail.SendKeys(newUser);
            inputPassword.SendKeys(pass);
            btnLogin.Click();
            return this;
        }
    }
}
