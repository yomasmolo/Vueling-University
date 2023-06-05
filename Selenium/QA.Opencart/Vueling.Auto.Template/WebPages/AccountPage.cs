using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;

namespace Opencart.Auto.WebPages
{
    public class AccountPage : CommonPage
    {
        public AccountPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement h2Account
        {
            get { return WebDriver.FindElementByXPath("//h2[text()='My Account']"); }
        }
        private IWebElement liHome
        {
            get { return WebDriver.FindElementByXPath("//i[@class='fa fa-home']"); }
        }
        public string GetMyAccount()
        {
            string getAccounttxt = h2Account.Text;
            return getAccounttxt;
        }
        public AccountPage goHome()
        {
            liHome.Click();
            return this;
        }
    }
}
