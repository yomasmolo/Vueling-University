using Opencart.Auto.Common;
using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace Opencart.Auto.WebPages
{
    public class CartPage : CommonPage
    {
        public CartPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement firstProduct
        {
            get { return WebDriver.FindElementByXPath("//table[@class='table table-bordered']//a[text()='Canon EOS 5D']"); }
        }
        private IWebElement secondProduct
        {
            get { return WebDriver.FindElementByXPath("//table[@class='table table-bordered']//a[text()='Samsung Galaxy Tab 10.1']"); }
        }
        private IWebElement btnCheckout
        {
            get { return WebDriver.FindElementByXPath("//div[@class='pull-right']"); }
        }
        private IWebElement btnDelete
        {
            get { return WebDriver.FindElementByXPath("//button[@class='btn btn-danger']"); }
        }
        private IWebElement aContinue
        {
            get { return WebDriver.FindElementByXPath("//a[@class='btn btn-primary']"); }
        }
        protected By _ShoppingText
        {
            get { return By.XPath("//h1[text()='Shopping Cart']"); }
        }
        //button[@class='btn btn-danger']
        public string GetFirstProduct()
        {
            string nameProduct = firstProduct.Text;
            return nameProduct;
        }
        public string GetSecondProduct()
        {
            string nameProduct = secondProduct.Text;
            return nameProduct;
        }
        public CartPage goCheckout()
        {
            btnCheckout.Click();
            return this;
        }
        public CartPage deleteitem()
        {
            btnDelete.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_ShoppingText));
            aContinue.Click();
            return this;
        }
    }
}
