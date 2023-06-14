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

namespace Marialunarillos.Auto.WebPages
{
    public class MarialunarillosHomePage : CommonPage
    {
        public MarialunarillosHomePage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IWebElement btnTramitarPedido
        {
            get { return WebDriver.FindElementById("top-cart-btn-checkout"); }
        }
        private IWebElement btnAcceptCookies
        {
            get { return WebDriver.FindElementByXPath("//button[@data-amgdprcookie-js='accept']"); }
        }
        private IWebElement btnImpresionesComestibles
        {
            get { return WebDriver.FindElementByXPath("//a[@title='IMPRESIONES COMESTIBLES']"); }
        }
        private IWebElement btnCarrito
        {
            get { return WebDriver.FindElementByXPath("//a[@class='action showcart']"); }
        }
        
        public MarialunarillosHomePage AcceptCookies()
        {
            btnAcceptCookies.Click();
            return this;
        }
        public MarialunarillosHomePage IrImpresionesComestibles()
        {
            btnImpresionesComestibles.Click();
            return this;
        }
        public MarialunarillosHomePage IrCheckout()
        {
            btnCarrito.Click();
            btnTramitarPedido.Click();
            return this;
        }

    }
}
