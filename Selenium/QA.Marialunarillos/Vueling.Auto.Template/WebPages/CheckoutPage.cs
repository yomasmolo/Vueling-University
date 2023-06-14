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
    public class CheckoutPage : CommonPage
    {
        public CheckoutPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();


    }
}
