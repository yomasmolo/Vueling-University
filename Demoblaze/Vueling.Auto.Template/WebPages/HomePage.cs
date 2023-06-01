using Demoblaze.Auto.SetUp;
using Demoblaze.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using Demoblaze.Auto.Webpages;
using Demoblaze.Auto.Common;
using OpenQA.Selenium.Support.UI;
using System;
using NUnit.Framework;
using OpenQA.Selenium.Support.PageObjects;

namespace Demoblaze.Auto.WebPages
{
    public class HomePage : CommonPage
    {
        public HomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement btnHome
        {
            get { return WebDriver.FindElementByXPath("//a[text() = 'Home ']"); }
        }
        private IWebElement btnCart
        {
            get { return WebDriver.FindElementById("cartur"); }
        }
        private IWebElement btnLogin
        {
            get { return WebDriver.FindElementByXPath("//a[text() = 'Log in']"); }
        }
        private IWebElement btnSingUp
        {
            get { return WebDriver.FindElementByXPath("//a[text() = 'Sign up']"); }
        }
        private IWebElement _UserName
        {
            get { return WebDriver.FindElement(UserName); }
        }
        protected By UserName
        {
            get { return By.Id("nameofuser"); }
        }
        private IWebElement LinkCategories(string itemCategori)
        {
            return WebDriver.FindElementByXPath("//a[text() = '"+itemCategori+"']");
        }
        private IWebElement LinkItem(string itemName)
        {
            return WebDriver.FindElementByXPath("//a[text() = '"+itemName+"']");
        }
        


        public HomePage ClickLogin()
        {
            btnLogin.Click();
            return this;
        }
        public HomePage ClickCart()
        {
            btnCart.Click();
            return this;
        }
        public HomePage WaitUserName()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(UserName));
            return this;
        }
        public HomePage NameAssert()
        {
            Assert.AreEqual("Welcome Marc", _UserName.Text);
            Console.WriteLine(_UserName.Text);
            return this;
        }
        public HomePage ClickCategori(string itemCategori, string itemName)
        {
            LinkCategories(itemCategori).Click();
            LinkItem(itemName).Click();
            return this;
        }
        public HomePage ClickHome()
        {
            btnHome.Click();
            return this;
        }
    }
}
