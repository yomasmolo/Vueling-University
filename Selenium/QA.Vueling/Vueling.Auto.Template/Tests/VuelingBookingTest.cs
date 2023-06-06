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
            ticketVuelingHomePage = new TicketVuelingHomePage(setUpWebDriver);
            ticketVuelingHomePage.AcceptCookies();
            ticketVuelingHomePage.ChooseOrigin(origin, destination);
            ticketVuelingHomePage.firstDayAvailable(month);
        }
    }
}
