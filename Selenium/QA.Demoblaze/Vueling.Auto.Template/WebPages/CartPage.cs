using Demoblaze.Auto.SetUp;
using Demoblaze.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using Demoblaze.Auto.Webpages;
using NUnit.Framework;
using System;
using Demoblaze.Auto.Common;
using OpenQA.Selenium.Support.UI;

namespace Demoblaze.Auto.WebPages
{
    public class CartPage : CommonPage
    {
        public CartPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement PriceItem(string priceValue)
        {
            return WebDriver.FindElementByXPath("//td[text() = '"+priceValue+"']");
        }
        private IWebElement FirstProductName(string firstName)
        {
            return WebDriver.FindElementByXPath("//td[text() = '" + firstName + "']");
        }
        private IWebElement SecondProductName(string secondName)
        {
            return WebDriver.FindElementByXPath("//td[text() = '" + secondName + "']");
        }
        protected By H2Element
        {
            get { return By.XPath("//h2[text()='Products']"); }
        }
        private IWebElement btnPlaceorder
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Place Order']"); }
        }
        private IWebElement txtAreaName
        {
            get { return WebDriver.FindElementById("name"); }
        }
        private IWebElement txtAreaCountry
        {
            get { return WebDriver.FindElementById("country"); }
        }
        private IWebElement txtAreaCity
        {
            get { return WebDriver.FindElementById("city"); }
        }
        private IWebElement txtAreaCreditCard
        {
            get { return WebDriver.FindElementById("card"); }
        }
        private IWebElement txtAreaMonth
        {
            get { return WebDriver.FindElementById("month"); }
        }
        private IWebElement txtAreaYear
        {
            get { return WebDriver.FindElementById("year"); }
        }
        private IWebElement btnPurchase
        {
            get { return WebDriver.FindElementByXPath("//button[text()='Purchase']"); }
        }
        private IWebElement ConfirmMessage
        {
            get { return WebDriver.FindElementByXPath("//h2[text()='Thank you for your purchase!']"); }
        }
        private IWebElement btnOK
        {
            get { return WebDriver.FindElementByXPath("//button[text()='OK']"); }
        }
        private IWebElement LinkDelete(string deleteLink)
        {
            return WebDriver.FindElementByXPath("//tr[@class='success']/td[text()='"+deleteLink+"']/../td/a");
        }

    public CartPage PriceAssert(string priceValue)
        {
            Assert.AreEqual(priceValue, PriceItem(priceValue).Text);
            btnPlaceorder.Click();
            return this;
        }
        public CartPage ProductsAssert(string firstName, string secondName)
        {
            Assert.AreEqual(firstName, PriceItem(firstName).Text);
            Assert.AreEqual(secondName, PriceItem(secondName).Text);
            return this;
        }
        public CartPage WaitProducts()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(H2Element));
            return this;
        }
        public CartPage FillPlaceOrder()
        {
            txtAreaName.SendKeys("Marc");
            txtAreaCountry.SendKeys("Spain");
            txtAreaCity.SendKeys("Barcelona");
            txtAreaCreditCard.SendKeys("4587 2365 9845 1298");
            txtAreaMonth.SendKeys("Abril");
            txtAreaYear.SendKeys("2023");
            btnPurchase.Click();
            return this;
        }
        public CartPage ConfirmAssert()
        {
            Assert.AreEqual("Thank you for your purchase!", ConfirmMessage.Text);
            btnOK.Click();
            return this;
        }
        public CartPage DeleteItem(string deleteLink)
        {
            LinkDelete(deleteLink).Click();
            return this;
        }
    }
}
