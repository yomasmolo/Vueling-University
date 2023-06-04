using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;

namespace Opencart.Auto.WebPages
{
    public class RegisterPage : CommonPage
    {
        public RegisterPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement inputFirstName
        {
            get { return WebDriver.FindElementById("input-firstname"); }
        }
        private IWebElement inputLastName
        {
            get { return WebDriver.FindElementById("input-lastname"); }
        }
        private IWebElement inputEmail
        {
            get { return WebDriver.FindElementById("input-email"); }
        }
        private IWebElement inputPhone
        {
            get { return WebDriver.FindElementById("input-telephone"); }
        }
        private IWebElement inputPassword
        {
            get { return WebDriver.FindElementById("input-password"); }
        }
        private IWebElement inputConfirm
        {
            get { return WebDriver.FindElementById("input-confirm"); }
        }
        private IWebElement checkboxPolicy
        {
            get { return WebDriver.FindElementByXPath("//input[@type='checkbox']"); }
        }
        private IWebElement btnContinue
        {
            get { return WebDriver.FindElementByXPath("//input[@type='submit']"); }
        }

        public RegisterPage FillForm(string newUser)
        {
            inputFirstName.SendKeys("Paco");
            inputLastName.SendKeys("Alcazer");
            inputEmail.SendKeys(newUser);
            inputPhone.SendKeys("687474665");
            inputPassword.SendKeys("Hola1234!");
            inputConfirm.SendKeys("Hola1234!");
            checkboxPolicy.Click();
            btnContinue.Click();
            return this;
        }
    }
}
