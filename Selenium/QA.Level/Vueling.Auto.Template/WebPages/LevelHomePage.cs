using Level.Auto.SetUp;
using Level.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using Level.Auto.Common;
using OpenQA.Selenium.Support.UI;
using System;
using NUnit.Framework;
using OpenQA.Selenium.Support.PageObjects;
using System.Drawing;

namespace Level.Auto.WebPages
{
    public class LevelHomePage : CommonPage
    {
        public LevelHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();


        private IWebElement btnOrigen
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='origin']"); }
        }
        private IWebElement inputOrigen
        {
            get { return WebDriver.FindElementByXPath("//input[@placeholder='¿Desde dónde?']"); }
        }
        private IWebElement cityOrigen(string origen)
        {
            return WebDriver.FindElementByXPath("(//div[text()='" + origen + "'])[1]");
        }
        private IWebElement inputDestino
        {
            get { return WebDriver.FindElementByXPath("(//input[@class='input-value'])[2]"); }
        }
        private IWebElement cityDestino(string destino)
        {
            return WebDriver.FindElementByXPath("(//div[text()='" + destino + "'])[2]");
        }
        private IWebElement Dates(string dateDeparture)
        {
            return WebDriver.FindElementByXPath("//div[@class='day' and text()='" + dateDeparture + "']");
        }
        private IWebElement adultPasseger
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='adult']//div[@class='js-plus']"); }
        }
        private IWebElement childrenPasseger
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='child']//div[@class='js-plus']"); }
        }
        private IWebElement btnListo
        {
            get { return WebDriver.FindElementByXPath("//button[text()='LISTO']"); }
        }
        private IWebElement btnBuscarVuelos
        {
            get { return WebDriver.FindElementByXPath("//span[text()='Buscar vuelos']"); }
        }
        private IWebElement firstData(string first)
        {
            return WebDriver.FindElementByXPath("//div[@data-time='" + first + "']");
        }
        private IWebElement btnNextAction
        {
            get { return WebDriver.FindElementByXPath("//button[2]/span"); }
        }
        private IWebElement firstDayAvailable
        {
            get { return WebDriver.FindElementByXPath("((//div[@class='datepicker__months']/section[1]//div[@class='datepicker__day is-available '])[1])"); }
        }
        private IWebElement startTripDay
        {
            get { return WebDriver.FindElementByXPath("//div[@class='datepicker__day is-available is-start-date is-in-range is-end-date']"); }
        }
        private IWebElement endTripDay(IWebElement initialDay, int daysMore)
        {
            string initialDayDataTime = initialDay.GetAttribute("data-time");
            long initialDayInt = long.Parse(initialDayDataTime);
            long daysMoreMili = daysMore * 24 * 60 * 60 * 1000;
            long expectedDay = initialDayInt + daysMoreMili;
            return WebDriver.FindElementByXPath("//div[@data-time='"+expectedDay+"']");
        }
        private IWebElement adultNumber
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='adult']//div[@class='pax-count js-pax-count']"); }
        }
        private IWebElement btnAdultPlus
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='adult']//div[@class='js-plus']"); }
        }
        private IWebElement childNumber
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='child']//div[@class='pax-count js-pax-count']"); }
        }
        private IWebElement btnChildPlus
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='child']//div[@class='js-plus']"); }
        }
        private IWebElement infantNumber
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='infant']//div[@class='pax-count js-pax-count']"); }
        }
        private IWebElement btnInfantPlus
        {
            get { return WebDriver.FindElementByXPath("//div[@data-field='infant']//div[@class='js-plus']"); }
        }
        public LevelHomePage ChooseDestinations(string origen, string destino)
        {
            WebDriver.FindElement(By.Id("ensCloseBanner")).Click();

            btnOrigen.Click();
            inputOrigen.SendKeys(origen);
            cityOrigen(origen).Click();
            Thread.Sleep(1000);
            inputDestino.SendKeys(destino);
            cityDestino(destino).Click();
            return this;
        }
        public LevelHomePage ChooseDates(string dateDeparture, string dateArrival)
        {
            Dates(dateDeparture).Click();
            Dates(dateArrival).Click();
            return this;
        }
        public LevelHomePage Passengers()
        {
            adultPasseger.Click();
            childrenPasseger.Click();
            btnListo.Click();
            btnBuscarVuelos.Click();
            return this;
        }
        public LevelHomePage ChoseFechaIda(string month, int daysMore)
        {

            while (WebDriver.FindElementByXPath("//div[@class='datepicker__months']/section[1]//span[@class='month']").Text != month.ToUpper())
            {
                btnNextAction.Click();
            }
            firstDayAvailable.Click();
            endTripDay(startTripDay, daysMore).Click();
            return this;
        }
        public LevelHomePage addPassengers(string numOfAdults, string numOfChilds, string numOfInfants)
        {
            
            while (adultNumber.Text != numOfAdults)
            {
                btnAdultPlus.Click();
            }
            while (childNumber.Text != numOfChilds)
            {
                btnChildPlus.Click();
            }
            while (infantNumber.Text != numOfInfants)
            {
                btnInfantPlus.Click();
            }
            btnListo.Click();
            btnBuscarVuelos.Click();
            return this;
        }
    }
}
