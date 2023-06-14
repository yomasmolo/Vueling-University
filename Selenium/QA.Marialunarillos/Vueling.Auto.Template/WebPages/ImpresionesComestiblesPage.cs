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
    public class ImpresionesComestiblesPage : CommonPage
    {
        public ImpresionesComestiblesPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement titulo
        {
            get { return WebDriver.FindElementByXPath("//span[@class='base']"); }
        }
        private IWebElement Papel(string tipoPapel)
        {
            return WebDriver.FindElementByXPath("//img[@alt='"+tipoPapel+ " - Personalizado']");
        }
        public IWebElement Gettitulo()
        {
            return titulo;
        }
        public ImpresionesComestiblesPage SeleccionarTipoPapel(string tipoPapel)
        {
            Papel(tipoPapel).Click();
            return this;
        }

    }
}
