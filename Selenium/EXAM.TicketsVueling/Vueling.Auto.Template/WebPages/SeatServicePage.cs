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
    public class SeatServicePage : CommonPage
    {
        public SeatServicePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement casco
        {
            get { return WebDriver.FindElementById("casco_0_0"); }
        }
        protected By _casco
        {
            get { return By.Id("casco_0_0"); }
        }

        public IWebElement Getcasco()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_casco));
            return casco;
        }
    }
}
