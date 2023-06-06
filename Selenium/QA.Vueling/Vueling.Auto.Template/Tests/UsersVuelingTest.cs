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
    class TicketsVuelingUsersTests : TestSetCleanBase
    {
        [TestCase]
        public void SingUpTest()
        {
            int randomInt = Helpers.GetRandomInt();
            string randomString = Helpers.GetRandomString(9);
            singUpPage = new SingUpPage(setUpWebDriver);
            ticketVuelingHomePage = new TicketVuelingHomePage(setUpWebDriver);
            ticketVuelingHomePage.AcceptCookies();
            ticketVuelingHomePage.GoSingUp();
            singUpPage.FillSingUpForm(randomInt, randomString);
        }
    }
}
