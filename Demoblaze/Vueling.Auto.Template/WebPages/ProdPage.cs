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

namespace Demoblaze.Auto.WebPages
{
    public class ProdPage : CommonPage
    {
        public ProdPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }

        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();


        private IWebElement _BodyId
        {
            get { return WebDriver.FindElement(BodyId); }
        }
        protected By BodyId
        {
            get { return By.Id("tbodyid"); }
        }
        private IWebElement btnAddCard
        {
            get { return WebDriver.FindElementByXPath("//a[text() = 'Add to cart']"); }
        }

        
        public ProdPage BtnAssert()
        {
            Assert.AreEqual("Add to cart", btnAddCard.Text);
            Console.WriteLine(btnAddCard.Text);
            return this;
        }
        public ProdPage WaitAddCard()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(BodyId));
            btnAddCard.Click();
            return this;
        }

    }
}
