using AventStack.ExtentReports;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Level.Auto.WebPages;
using Level.Auto.Common;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System.Xml.Linq;
using System.Threading;
using Level.Auto.SetUp;
using Level.Auto.Tests;

namespace Level.Auto.Tests
{
    [TestFixture]
    class LevelTests : TestSetCleanBase
    {
        [TestCase]
        public void TestFindFlights()
        {
            string origen = "Barcelona";
            string destino = "Buenos Aires";
            string fechaIda = "10";
            string fechaVuelta = "14";

            levelHomePage = new LevelHomePage(setUpWebDriver);
            levelHomePage.ChooseDestinations(origen, destino);
            levelHomePage.ChooseDates(fechaIda, fechaVuelta);
            levelHomePage.Passengers();
        }
        [TestCase]
        public void BarcelonaSantiagodechileTest()
        {
            string origen = "Barcelona";
            string destino = "Santiago de Chile";
            string month = "septiembre";
            int daysMore = 11;
            string numOfAdults = "3";
            string numOfChilds = "1";
            string numOfInfants = "1";
            //string fechaVuelta = "14";
            levelHomePage = new LevelHomePage(setUpWebDriver);
            levelHomePage.ChooseDestinations(origen, destino);
            levelHomePage.ChoseFechaIda(month, daysMore);
            levelHomePage.addPassengers(numOfAdults, numOfChilds, numOfInfants);
        }
    }
}
