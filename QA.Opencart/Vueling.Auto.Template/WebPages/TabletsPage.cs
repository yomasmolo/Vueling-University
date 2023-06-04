using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;

namespace Opencart.Auto.WebPages
{
    public class TabletsPage : CommonPage
    {
        public TabletsPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement selectSamsung
        {
            get { return WebDriver.FindElementByXPath("//h4/a[text()='Samsung Galaxy Tab 10.1']"); }
        }
        public TabletsPage ViewSamsung()
        {
            selectSamsung.Click();
            return this;
        }
    }
}
