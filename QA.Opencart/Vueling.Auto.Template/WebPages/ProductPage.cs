using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Security.Principal;

namespace Opencart.Auto.WebPages
{
    public class ProductPage : CommonPage
    {
        public ProductPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement h2Product
        {
            get { return WebDriver.FindElementByXPath("//h1[text()='Samsung Galaxy Tab 10.1']"); }
        }
        private IWebElement btnAddToCart
        {
            get { return WebDriver.FindElementById("button-cart"); }
        }
        private IWebElement liCameras
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Cameras']"); }
        }
        private IWebElement selectColor
        {
            get { return WebDriver.FindElementById("input-option226"); }
        }
        private IWebElement color
        {
            get { return WebDriver.FindElementByXPath("//option[@value='15']"); }
        }
        private IWebElement items
        {
            get { return WebDriver.FindElementById("cart-total"); }
        }
        private IWebElement viewCart
        {
            get { return WebDriver.FindElementByXPath("//strong[text()=' View Cart']"); }
        }
        //strong[text()=' View Cart']
        public string GetProductName()
        {
            string getProducttxt = h2Product.Text;
            return getProducttxt;
        }
        public ProductPage AddtoCard()
        {
            btnAddToCart.Click();
            return this;
        }
        public ProductPage goCameras()
        {
            liCameras.Click();
            return this;
        }
        public ProductPage Options()
        {
            selectColor.Click();
            color.Click();
            return this;
        }
        public ProductPage goCart()
        {
            items.Click();
            viewCart.Click();
            return this;
        }
    }
}
