using Marialunarillos.Auto.SetUp;
using Marialunarillos.Auto.WebPages.Base;
using OpenQA.Selenium;
using System.Collections.Generic;
using System.Threading;
using Marialunarillos.Auto.Common;
using OpenQA.Selenium.Support.UI;
using System;
using NUnit.Framework;
using OpenQA.Selenium.Support.PageObjects;
using System.Drawing;
using AventStack.ExtentReports.Gherkin.Model;
using System.Collections;

namespace Marialunarillos.Auto.WebPages
{
    public class ProductosPage : CommonPage
    {
        public ProductosPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement btnAñadirCarrito(int randomNum)
        {
            return WebDriver.FindElementByXPath("(//button[@title='Añadir a la cesta'])["+randomNum+"]");
        }
        protected By titulo
        {
            get { return By.XPath("//span[@class='base']"); }
        }
        //"(//div[@class='product-item-price-actions'])["+randomNum+"]//button"
        public ProductosPage AñadirProductoRandom()
        {
            new WebDriverWait(WebDriver, TimeSpan.FromSeconds(WaitTimeout)).Until(CustomExpectedConditions.ElementIsVisible(titulo));

            Random random = new Random();
            int randomNum = random.Next(1, 54);
            btnAñadirCarrito(randomNum).Click();
            return this;
        }
    }
}
