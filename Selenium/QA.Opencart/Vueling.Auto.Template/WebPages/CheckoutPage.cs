using Opencart.Auto.Common;
using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace Opencart.Auto.WebPages
{
    public class CheckoutPage : CommonPage
    {
        public CheckoutPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new NotImplementedException();

        private IWebElement firstNamenField
        {
            get { return WebDriver.FindElementById("input-payment-firstname"); }
        }
        private IWebElement lastNameField
        {
            get { return WebDriver.FindElementById("input-payment-lastname"); }
        }
        private IWebElement address1Field
        {
            get { return WebDriver.FindElementById("input-payment-address-1"); }
        }
        private IWebElement cityField
        {
            get { return WebDriver.FindElementById("input-payment-city"); }
        }
        private IWebElement postCodeField
        {
            get { return WebDriver.FindElementById("input-payment-postcode"); }
        }
        private IWebElement countryField
        {
            get { return WebDriver.FindElementById("input-payment-country"); }
        }
        private IWebElement regionStateField
        {
            get { return WebDriver.FindElementById("input-payment-zone"); }
        }

        private IWebElement btnContinue
        {
            get { return WebDriver.FindElementById("button-payment-address"); }
        }
        protected By _btnContinue
        {
            get { return By.Id("button-payment-address"); }
        }
        private IWebElement btnContinueAdress
        {
            get { return WebDriver.FindElementById("button-shipping-address"); }
        }
        private IWebElement btnContinueMethod
        {
            get { return WebDriver.FindElementById("button-shipping-method"); }
        }
        protected By _btnContinueMethod
        {
            get { return By.Id("button-shipping-method"); }
        }
        private IWebElement btnContinuePayment
        {
            get { return WebDriver.FindElementById("button-payment-method"); }
        }
        protected By _btnContinuePayment
        {
            get { return By.Id("button-payment-method"); }
        }
        private IWebElement checkbox
        {
            get { return WebDriver.FindElementByXPath("//input[@type='checkbox']"); }
        }
        private IWebElement optionSpain
        {
            get { return WebDriver.FindElementByXPath("//select[@name='country_id']//option[@value='195']"); }
        }
        private IWebElement optionBarcelona
        {
            get { return WebDriver.FindElementByXPath("//option[text()='Barcelona']"); }
        }
        private IWebElement btnConfirmOrder
        {
            get { return WebDriver.FindElementById("button-confirm"); }
        }
        protected By Acordeon
        {
            get { return By.XPath("//div[@id=\"accordion\"]//h4[text()='Step 1: Checkout Options']"); }
        }
        private IWebElement alertOrder
        {
            get { return WebDriver.FindElementByXPath("//h1[text()='Your order has been placed!']"); }
        }
        private IWebElement returnHome
        {
            get { return WebDriver.FindElementByXPath("//a[@class='btn btn-primary']"); }
        }
        public CheckoutPage fillCheckout()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(Acordeon));
            
                firstNamenField.SendKeys("Paco");
                lastNameField.SendKeys("Alcacer");
                address1Field.SendKeys("calle gava");
                cityField.SendKeys("Barcelona");
                postCodeField.SendKeys("08014");
                countryField.Click();
                optionSpain.Click();
                regionStateField.Click();
                optionBarcelona.Click();
                btnContinue.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_btnContinue));
                btnContinueAdress.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_btnContinueMethod));
                btnContinueMethod.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_btnContinuePayment));
                checkbox.Click();
                btnContinuePayment.Click();
                btnConfirmOrder.Click();
            
            return this;
        }
        public string GetTxtAlert()
        {
            string orderPlaced = alertOrder.Text;
            return orderPlaced;
        }
        public CheckoutPage exitOrder()
        {
            returnHome.Click();
            return this;
        }
    }
}
