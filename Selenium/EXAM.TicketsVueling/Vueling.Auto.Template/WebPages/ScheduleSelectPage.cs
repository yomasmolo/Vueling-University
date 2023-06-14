using TicketsVueling.Auto.SetUp;
using TicketsVueling.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using TicketsVueling.Auto.Common;
using OpenQA.Selenium.Support.UI;
using System;
using NUnit.Framework;
using OpenQA.Selenium.Support.PageObjects;
using System.Drawing;
using System.Globalization;

namespace TicketsVueling.Auto.WebPages
{
    public class ScheduleSelectPage : CommonPage
    {
        public ScheduleSelectPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement btnOutboundPrice
        {
            get { return WebDriver.FindElementByXPath("//input[@id='ID0E23BI']/../../div[@id='selectFlightButton']"); }
        }
        private IWebElement btnReturnPrice
        {
            get { return WebDriver.FindElementByXPath("//input[@id='ID0EZWCK']/../..//div[@class='trip-selector_button']"); }
        }

        protected By _divSelectPage
        {
            get { return By.XPath("//div[@id='selectPage']"); }
        }
        private IWebElement btnFee(string fee)
        {
            return WebDriver.FindElementByXPath("//label[@for='"+fee+"']");
        }
        protected By _flightCardContent
        {
            get { return By.XPath("//input[@id='ID0EZWCK']/../.."); }
        }
        private IWebElement btnContinue
        {
            get { return WebDriver.FindElementById("stvContinueButton"); }
        }
        
        public ScheduleSelectPage SelectPricesAndFee(string fee)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_divSelectPage));
            btnOutboundPrice.Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_flightCardContent));
            Jse2.ExecuteScript("arguments[0].scrollIntoView()", btnReturnPrice);
            btnReturnPrice.Click();
            btnFee(fee).Click();
            btnContinue.Click();
            return this;
        }

    }
}
