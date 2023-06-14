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

        private IWebElement btnacceptCookies
        {
            get { return WebDriver.FindElementById("onetrust-accept-btn-handler"); }
        }
        private IWebElement h2SearcherTitle
        {
            get { return WebDriver.FindElementByXPath("//h2[text()='Search for a flight:']"); }
        }

        //private IWebElement spanCurrency
        //    get { return WebDriver.FindElementById("currencyDropDownButton"); }
        //}
        //private IWebElement btnCurrency
        //{
        //    get { return WebDriver.FindElementByXPath("//li[@currency='EUR']"); }
        //}

        private IWebElement inputOrigin
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_TextBoxMarketOrigin1"); }
        }
        private IWebElement stationListOrigin(string idOrigin)
        {
            return WebDriver.FindElementByXPath("//a[@data-id-code='"+idOrigin+"']");
        }
        private IWebElement stationListDestination(string idDestination)
        {
            return WebDriver.FindElementByXPath("//a[@data-id-code='" + idDestination + "']");
        }
        private IWebElement aFirstDay(int days)
        {
            return WebDriver.FindElementByXPath("(//td[@data-handler='selectDay'])["+days+"]/a");
        }
        private IWebElement lastDay(int days)
        {
            return WebDriver.FindElementByXPath("(//td[@data-handler='selectDay'])["+days+"]/a");
        }
        private IWebElement selectPassengers
        {
            get { return WebDriver.FindElementById("DropDownListPassengerType_ADT_PLUS"); }
        }
        private IWebElement numOfPassengers(int passengers)
        {
            return WebDriver.FindElementByXPath("//select[@id='adtSelectorDropdown']/option[@value='"+passengers+"']");
        }
        private IWebElement selectInfants
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT"); }
        }
        private IWebElement numOfInfants(int infants)
        {
            return WebDriver.FindElementByXPath("//select[@id='AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT']/option[@value='"+infants+"']");
        }
        private IWebElement btnSearchFlight
        {
            get { return WebDriver.FindElementByXPath("//a[@id='AvailabilitySearchInputSearchView_btnClickToSearchNormal']"); }
        }
        private IWebElement spanLanguages
        {
            get { return WebDriver.FindElementByXPath("//li[@class='vy-header-dropdown dropdown-lang']"); }
        }
        private IWebElement btnLanguagesEnglish
        {
            get { return WebDriver.FindElementById("language_option_en-GB"); }
        }
        //a[@id='language_option_en-GB']
        protected By _Calendar
        {
            get { return By.XPath("(//table[@class='ui-datepicker-calendar'])[1]"); }
        }
        public TicketVuelingHomePage AcceptCookies()
        {
            btnacceptCookies.Click();
            return this;
        }
        public TicketVuelingHomePage SelectLanguage()
        {
            spanLanguages.Click();
            btnLanguagesEnglish.Click();
            return this;
        }
        public string GetSearcherTitle()
        {
            return h2SearcherTitle.Text;    
        }
        public TicketVuelingHomePage ChooseOriginandDestination(string idOrigin, string idDestination)
        {
            inputOrigin.Click();
            stationListOrigin(idOrigin).Click();
            stationListDestination(idDestination).Click();
            return this;
        }
        public TicketVuelingHomePage SelectFirstDayAndLastDay(int daysMoreGo, int daysMoreComeBack)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_Calendar));
            aFirstDay(daysMoreGo).Click();
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_Calendar));
            lastDay(daysMoreComeBack).Click();
            return this;
        }
        public TicketVuelingHomePage SelectPassengersAndSearch(int passengers, int infants)
        {
            selectPassengers.Click();
            numOfPassengers(passengers).Click();
            selectInfants.Click();
            numOfInfants(infants).Click();
            btnSearchFlight.Click();
            return this;
        }
        
        public TicketVuelingHomePage SearchFlights()
        {
            btnSearchFlight.Click();
            return this;
        }

        
    }
}
