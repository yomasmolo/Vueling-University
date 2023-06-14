using AventStack.ExtentReports;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Marialunarillos.Auto.WebPages;
using Marialunarillos.Auto.Common;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System.Xml.Linq;
using System.Threading;
using Marialunarillos.Auto.SetUp;
using Marialunarillos.Auto.Tests;

namespace Marialunarillos.Auto.Tests
{
    [TestFixture]
    class ImpresionesComestibleTests : TestSetCleanBase
    {
        [TestCase]
        public void ComprarProductoEspecificoTest()
        {
            string producto = "Papel de azúcar";
            marialunarillosHomePage = new MarialunarillosHomePage(setUpWebDriver);
            impresionesComestiblesPage = new ImpresionesComestiblesPage(setUpWebDriver);
            productosPage = new ProductosPage(setUpWebDriver);
            marialunarillosHomePage.AcceptCookies();
            marialunarillosHomePage.IrImpresionesComestibles();
            Assert.True(impresionesComestiblesPage.Gettitulo().Displayed, "No aparece");
            Assert.AreEqual("IMPRESIÓN PERSONALIZADA", impresionesComestiblesPage.Gettitulo().Text.ToUpper());
            impresionesComestiblesPage.SeleccionarTipoPapel(producto);
            productosPage.AñadirProductoRandom();
            marialunarillosHomePage.IrCheckout();
        }
        
        
    }
}
