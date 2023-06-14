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
        public void BookFlightEnglish()
        {
            string origin = "BCN";
            string destination = "MAD";
            int daysMoreGo = 4;
            int daysMoreComeBack = 3;
            int passengers = 1;
            int infants = 1;
            string fee = "Basic";
            string nameAdult = Helpers.GetRandomString(5);
            string lastNameAdult = Helpers.GetRandomString(6);
            string nameBaby = Helpers.GetRandomString(5);
            string lastNameBaby = Helpers.GetRandomString(6);
            string babyBirthday = "08/06/2022";
            int phone = Helpers.GetRandomPhoneNumber();
            string email = (Helpers.GetRandomString(8)+"@mail.com");
            ticketVuelingHomePage = new TicketVuelingHomePage(setUpWebDriver);
            scheduleSelectPage = new ScheduleSelectPage(setUpWebDriver);
            passengersInformationPage = new PassengersInformationPage(setUpWebDriver);
            seatServicePage = new SeatServicePage(setUpWebDriver);
            ticketVuelingHomePage.AcceptCookies();
            ticketVuelingHomePage.SelectLanguage();
            Assert.AreEqual("Search for a flight:", ticketVuelingHomePage.GetSearcherTitle());
            ticketVuelingHomePage.ChooseOriginandDestination(origin, destination);
            ticketVuelingHomePage.SelectFirstDayAndLastDay(daysMoreGo, daysMoreComeBack);
            ticketVuelingHomePage.SelectPassengersAndSearch(passengers, infants);
            scheduleSelectPage.SelectPricesAndFee(fee);
            passengersInformationPage.FillForm(nameAdult, lastNameAdult, nameBaby, lastNameBaby, babyBirthday, phone, email);
            Assert.AreEqual("BCN", passengersInformationPage.GettravelPlanDeparture());
            Assert.AreEqual("MAD", passengersInformationPage.GettravelPlanArrival());
            Assert.True(seatServicePage.Getcasco().Displayed, "No aparece");

        }
    }
}
