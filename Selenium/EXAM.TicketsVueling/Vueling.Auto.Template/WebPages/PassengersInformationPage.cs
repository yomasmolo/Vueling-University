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
    public class PassengersInformationPage : CommonPage
    {
        public PassengersInformationPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement inputAdultName
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_0"); }
        }
        private IWebElement inputAdultLastName
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_0"); }
        }
        private IWebElement inputBabyName
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxFirstName_0_0"); }
        }
        private IWebElement inputBabyLastName
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_TextBoxLastName_0_0"); }
        }
        private IWebElement inputBabyBirthDay
        {
            get { return WebDriver.FindElementById("birthDate1_1"); }
        }
        protected By _divPassengerInformation
        {
            get { return By.Id("passengerInformation"); }
        }
        private IWebElement travelPlanDeparture
        {
            get { return WebDriver.FindElementByXPath("(//div[@class='travelInfo_block_scheduleAirport'])[1]"); }
        }
        private IWebElement travelPlanArrival
        {
            get { return WebDriver.FindElementByXPath("(//div[@class='travelInfo_block_scheduleAirport'])[2]"); }
        }
        private IWebElement btnAllSet
        {
            get { return WebDriver.FindElementByXPath("//button[@class='booking-contact_form_button js-btnReady']"); }
        }
        private IWebElement listCountry
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_DropDownListCountry"); }
        }

        protected By _labelContact
        {
            get { return By.XPath("//label[@for='contact1']"); }
        }
        private IWebElement countryOption
        {
            get { return WebDriver.FindElementByXPath("//option[@value='ES']"); }
        }
        protected By _countryOption
        {
            get { return By.XPath("_countryOption"); }
        }

        private IWebElement listDiallingCode
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_DropDownListPrefix"); }
        }
        private IWebElement diallingOption
        {
            get { return WebDriver.FindElementByXPath("//option[@countrycode='ES']"); }
        }
        private IWebElement inputPhone
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxHomePhone"); }
        }
        private IWebElement inputEmail
        {
            get { return WebDriver.FindElementById("ContactViewControlGroupMainContact_BoxPassengerInformationView_BoxContactInformationView_TextBoxEmailAddress"); }
        }
        private IWebElement checkbox
        {
            get { return WebDriver.FindElementById("checkboxAcceptsPrivPolLabel"); }
        }
        private IWebElement btnContinue
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Continue']"); }
        }

        
        public PassengersInformationPage FillForm(string nameAdult, string lastNameAdult, string nameBaby, string lastNameBaby, string babyBirthday, int phone, string email)
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_divPassengerInformation));

            inputAdultName.SendKeys(nameAdult);
            inputAdultLastName.SendKeys(lastNameAdult);
            inputBabyName.SendKeys(nameBaby);
            inputBabyLastName.SendKeys(lastNameBaby);
            inputBabyBirthDay.SendKeys(babyBirthday);
            btnAllSet.Click();
            
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(_divPassengerInformation));

            listCountry.Click();
            countryOption.Click();
            listDiallingCode.Click();
            diallingOption.Click();
            inputPhone.SendKeys(phone.ToString());
            inputEmail.SendKeys(email);
            checkbox.Click();
            btnContinue.Click();

            return this;
        }
        public string GettravelPlanDeparture()
        {
            return travelPlanDeparture.Text;
        }
        public string GettravelPlanArrival()
        {
            return travelPlanArrival.Text;
        }
    }
}
