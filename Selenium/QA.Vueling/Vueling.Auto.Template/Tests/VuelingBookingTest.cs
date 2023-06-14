using AventStack.ExtentReports;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketsVueling.Auto.WebPages;
using TicketsVueling.Auto.Common;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System.Xml.Linq;
using System.Threading;
using TicketsVueling.Auto.SetUp;
using TicketsVueling.Auto.Tests;

namespace TicketsVueling.Auto.Tests
{
    [TestFixture]
    class TicketsVuelingBookingTests : TestSetCleanBase
    {
        [TestCase]
        public void CalendarTest()
        {
            string month = "agosto";
            string origin = "ALC";
            string destination = "BCN";
            int daysMore = 10;
            int passengers = 3;
            int childs = 1;
            int infants = 1;
            ticketVuelingHomePage = new TicketVuelingHomePage(setUpWebDriver);
            ticketVuelingHomePage.AcceptCookies();
            ticketVuelingHomePage.ChooseOriginandDestination(origin, destination);
            ticketVuelingHomePage.SelectFirstDateAndLastDate(month, daysMore);
            ticketVuelingHomePage.SelectPassengers(passengers, childs, infants);
            ticketVuelingHomePage.SearchFlights();
        }
        [TestCase]
        public void OWTest()
        {
            string origin = "ALC";
            string destination = "BCN";
            int daysMore = 4;
            int passengers = 1;
            int childs = 0;
            int infants = 1;
            ticketVuelingHomePage = new TicketVuelingHomePage(setUpWebDriver);
            ticketVuelingHomePage.AcceptCookies();
            ticketVuelingHomePage.SelectOWOption();
            ticketVuelingHomePage.ChooseOriginandDestination(origin, destination);
            ticketVuelingHomePage.FirstDayAvailableAtXdaysView(daysMore);
            ticketVuelingHomePage.SelectPassengers(passengers, childs, infants);
            ticketVuelingHomePage.SearchFlights();
        }
        [TestCase]
        public void BookFlightEnglish()
        {
            
            
            string origin = "ALC";
            string destination = "BCN";
            int daysMore = 4;
            int passengers = 1;
            int childs = 0;
            int infants = 1;
            ticketVuelingHomePage = new TicketVuelingHomePage(setUpWebDriver);
            ticketVuelingHomePage.AcceptCookies();
            ticketVuelingHomePage.SelectOWOption();
            ticketVuelingHomePage.ChooseOriginandDestination(origin, destination);
            ticketVuelingHomePage.FirstDayAvailableAtXdaysView(daysMore);
            ticketVuelingHomePage.SelectPassengers(passengers, childs, infants);
            ticketVuelingHomePage.SearchFlights();
        }
    }
}
