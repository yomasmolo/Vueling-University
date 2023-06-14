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
        protected By _aNextMonth
        {
            get { return By.XPath("//a[@title='Siguiente']"); }
        }
        private IWebElement Month
        {
            get { return WebDriver.FindElementByXPath("//div[@class='ui-datepicker-group ui-datepicker-group-first']//span[@class='ui-datepicker-month']"); }
        }
        private IWebElement aFirstDay
        {
            get { return WebDriver.FindElementByXPath("(//td[@data-handler='selectDay'])[1]"); }
        }
        private IWebElement lastDay(int days)
        {
            return WebDriver.FindElementByXPath("(//td[@data-handler='selectDay'])["+days+"]");
        }
        private IWebElement aSingUp
        {
            get { return WebDriver.FindElementByXPath("//a[@class='optionRegister login-menu']"); }
        }
        private IWebElement aSubmit
        {
            get { return WebDriver.FindElementByXPath("//a[@class='mv_button icon icon-right']"); }
        }
        private IWebElement selectPassengers
        {
            get { return WebDriver.FindElementById("DropDownListPassengerType_ADT_PLUS"); }
        }
        private IWebElement numOfPassengers(int passengers)
        {
            return WebDriver.FindElementByXPath("//select[@id='adtSelectorDropdown']/option[@value='"+passengers+"']");
        }
        private IWebElement selectChilds
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_DropDownListPassengerType_CHD"); }
        }
        private IWebElement numOfChilds(int childs)
        {
            return WebDriver.FindElementByXPath("//select[@id='AvailabilitySearchInputSearchView_DropDownListPassengerType_CHD']/option[@value='"+childs+"']"); 
        }
        private IWebElement selectInfants
        {
            get { return WebDriver.FindElementById("AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT"); }
        }
        private IWebElement numOfInfants(int infants)
        {
            return WebDriver.FindElementByXPath("//select[@id='AvailabilitySearchInputSearchView_DropDownListPassengerType_INFANT']/option[@value='"+infants+"']");
        }
        private IWebElement btnOW
        {
            get { return WebDriver.FindElementByXPath("//label[@for='AvailabilitySearchInputSearchView_OneWay']"); }
        }
        private IWebElement selectToday
        {
            get { return WebDriver.FindElementByXPath("//td[@class=' ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today']"); }
        }
        private IWebElement btnSearchFlight
        {
            get { return WebDriver.FindElementByXPath("//a[@id='AvailabilitySearchInputSearchView_btnClickToSearchNormal']"); }
        }
        protected By _hoverGreenOnDay
        {
            get { return By.XPath("//a[@title='Siguiente']"); }
        }
        private IWebElement spanLanguages
        {
            get { return WebDriver.FindElementByXPath("//li[@class='vy-header-dropdown dropdown-lang']"); }
        }
        private IWebElement btnLanguages
        {
            get { return WebDriver.FindElementByXPath("language_option_en-GB"); }
        }

        public TicketVuelingHomePage AcceptCookies()
        {
            btnacceptCookies.Click();
            return this;
        }
        public TicketVuelingHomePage ChooseOriginandDestination(string idOrigin, string idDestination)
        {
            inputOrigin.Click();
            stationListOrigin(idOrigin).Click();
            stationListDestination(idDestination).Click();
            return this;
        }
        public TicketVuelingHomePage SelectFirstDateAndLastDate(string month, int daysMore)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_aNextMonth));

            while (Month.Text != month)
            {
                aNextMonth.Click();
            }
            aFirstDay.Click();
            lastDay(daysMore).Click();

            //string firstDay = aFirstDay.Text;
            //int resultado = int.Parse(firstDay) + daysMore;
            //string resultadoString = resultado.ToString();
            return this;
        }
        public TicketVuelingHomePage SelectPassengers(int passengers, int childs, int infants)
        {
            selectPassengers.Click();
            numOfPassengers(passengers).Click();
            selectChilds.Click();
            numOfChilds(childs).Click();
            selectInfants.Click();
            numOfInfants(infants).Click();
            return this;
        }
        public TicketVuelingHomePage GoSingUp()
        {
            aSingUp.Click();
            aSubmit.Click();
            return this;
        }
        public TicketVuelingHomePage SelectOWOption() 
        { 
            btnOW.Click(); 
            return this;
        }
        public TicketVuelingHomePage FirstDayAvailableAtXdaysView(int daysMore)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_aNextMonth));
            selectToday.Click();
            lastDay(daysMore).Click();

            //string firstDay = aFirstDay.Text;
            //int resultado = int.Parse(firstDay) + daysMore;
            //string resultadoString = resultado.ToString();
            return this;
        }
        public TicketVuelingHomePage SearchFlights()
        {
            btnSearchFlight.Click();
            return this;
        }

        
    }
}
