using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;

namespace Opencart.Auto.WebPages
{
    public class CamerasPage : CommonPage
    {
        public CamerasPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement selecCanon
        {
            get { return WebDriver.FindElementByXPath("//h4/a[text()='Canon EOS 5D']"); }
        }
        public CamerasPage Viewcanon()
        {
            selecCanon.Click();
            return this;
        }
    }
}
