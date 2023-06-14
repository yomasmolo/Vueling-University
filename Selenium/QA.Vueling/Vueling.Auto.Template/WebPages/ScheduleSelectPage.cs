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
using System.Linq;


namespace TicketsVueling.Auto.WebPages
{
    public class ScheduleSelectPage : CommonPage
    {
        public ScheduleSelectPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();

        private IList<IWebElement> Prices { get { return WebDriver.FindElementsById("justPrice"); } }

        public ScheduleSelectPage ChooseBestPrice()
        {
            IList<IWebElement> listaOrdenada = orderElements.ToList();
            IList<IWebElement> orderElements = Prices.OrderBy(e => int.Parse(e.Text)).ToList();
            
            return this;
        }
    }

}
