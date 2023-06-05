using Opencart.Auto.SetUp;
using Opencart.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using Opencart.Auto.Common;
using OpenQA.Selenium.Support.UI;
using System;
using NUnit.Framework;
using OpenQA.Selenium.Support.PageObjects;
using System.Xml.Linq;
using NUnit.Framework;

namespace Opencart.Auto.WebPages
{
    public class OpencartHomePage : CommonPage
    {
        public OpencartHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement btnAvanzada
        {
            get { return WebDriver.FindElementById("details-button"); }
        }
        private IWebElement linkAcceder
        {
            get { return WebDriver.FindElementById("proceed-link"); }
        }
        
        private IWebElement liMyAccount
        {
            get { return WebDriver.FindElementByXPath("//i[@class='fa fa-user']"); }
        }
        private IWebElement liRegister
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Register']"); }
        }
        private IWebElement liLogin
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Login']"); }
        }
        private IWebElement liTablets
        {
            get { return WebDriver.FindElementByXPath("//a[text()='Tablets']"); }
        }
        private IWebElement altImg(string sponsor)
        {
            return WebDriver.FindElementByXPath("//*[@id='carousel0']/div/div[5]/img[@alt='"+sponsor+"']");
        }
        public OpencartHomePage HomeAcces()
        {
            btnAvanzada.Click();
            linkAcceder.Click();
            return this;
        }
        public OpencartHomePage RegisterAcces()
        {
            liMyAccount.Click();
            liRegister.Click();
            return this;
        }
        public OpencartHomePage LoginAcces()
        {
            liMyAccount.Click();
            liLogin.Click();
            return this;
        }
        public OpencartHomePage goTablets()
        {
            liTablets.Click();
            return this;
        }
        public OpencartHomePage FindSponsor(string sponsor)
        {
            if (altImg(sponsor) != null)
            {
                Console.WriteLine("El elemento existe en la página.");
            }
            else
            {
                Console.WriteLine("El elemento no existe en la página.");
            }
            string attributeAlt = altImg(sponsor).GetAttribute("alt");
            Assert.AreEqual(sponsor, attributeAlt);
            return this;
        }
    }
}
