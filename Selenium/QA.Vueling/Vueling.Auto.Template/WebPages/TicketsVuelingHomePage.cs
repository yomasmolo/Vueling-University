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

namespace TicketsVueling.Auto.WebPages
{
    public class TicketVuelingHomePage : CommonPage
    {
        public TicketVuelingHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();


        private IWebElement inputOrigin
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1"); }
        }
        private IWebElement inputDestination
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_TextBoxMarketDestination1"); }
        }
        private IWebElement stationListOrigin(string idOrigin)
        {
            return WebDriver.FindElementByXPath("//a[@data-id-code='"+idOrigin+"']");
        }
        private IWebElement stationListDestination(string idDestination)
        {
            return WebDriver.FindElementByXPath("//a[@data-id-code='" + idDestination + "']");
        }
        private IWebElement btnacceptCookies
        {
            get { return WebDriver.FindElementById("onetrust-accept-btn-handler"); }
        }
        private IWebElement aNextMonth
        {
            get { return WebDriver.FindElementByXPath("//a[@title='Siguiente']"); }
        }
        private IWebElement Month
        {
            get { return WebDriver.FindElementByXPath("//div[@class='ui-datepicker-group ui-datepicker-group-first']//span[@class='ui-datepicker-month']"); }
        }
        private IWebElement aFirstDay
        {
            get { return WebDriver.FindElementByXPath("//td[@data-handler=\"selectDay\"][1]"); }
        }
        private IWebElement aSingUp
        {
            get { return WebDriver.FindElementByXPath("//a[@class='optionRegister login-menu']"); }
        }
        private IWebElement aSubmit
        {
            get { return WebDriver.FindElementByXPath("//a[@class='mv_button icon icon-right']"); }
        }
        public TicketVuelingHomePage AcceptCookies()
        {
            btnacceptCookies.Click();
            return this;
        }
        public TicketVuelingHomePage ChooseOrigin(string idOrigin, string idDestination)
        {
            inputOrigin.Click();
            stationListOrigin(idOrigin).Click();
            stationListDestination(idDestination).Click();
            return this;
        }
        public TicketVuelingHomePage firstDayAvailable(string month)
        {
            while (Month.Text != month)
            {
                aNextMonth.Click();
            }
            aFirstDay.Click();
            return this;
        }
        public TicketVuelingHomePage GoSingUp()
        {
            aSingUp.Click();
            aSubmit.Click();
            return this;
        }
    }
}
