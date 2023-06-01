using AventStack.ExtentReports;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Demoblaze.Auto.Webpages;
using Demoblaze.Auto.WebPages;
using Demoblaze.Auto.Common;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System.Xml.Linq;
using System.Threading;

namespace Demoblaze.Auto.Tests
{
    [TestFixture]
    class DemoblazeTests : TestSetCleanBase
    {
        [TestCase]
        public void TestLoginBuy()
        {
            string itemName = "MacBook air";
            string priceValue = "700";
            string itemCategori = "Laptops";
            homepage = new HomePage(setUpWebDriver);
            homepage.ClickLogin();
            loginpage = new LoginPage(setUpWebDriver);
            prodPage = new ProdPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            loginpage.FillformClick();
            homepage.WaitUserName();
            homepage.NameAssert();
            homepage.ClickCategori(itemCategori, itemName);
            prodPage.BtnAssert();
            prodPage.WaitAddCard();
            homepage.ClickCart();
            cartPage.WaitProducts();
            cartPage.PriceAssert(priceValue);
            cartPage.FillPlaceOrder();
            cartPage.ConfirmAssert();
        }
        [TestCase]
        public void TestBuyPhone()
        {
            string itemName = "Nexus 6";
            string priceValue = "650";
            string itemCategori = "Phones";
            homepage = new HomePage(setUpWebDriver);
            homepage.ClickLogin();
            loginpage = new LoginPage(setUpWebDriver);
            prodPage = new ProdPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            loginpage.FillformClick();
            homepage.WaitUserName();
            homepage.NameAssert();
            homepage.ClickCategori(itemCategori, itemName);
            prodPage.BtnAssert();
            prodPage.WaitAddCard();
            homepage.ClickCart();
            cartPage.WaitProducts();
            cartPage.PriceAssert(priceValue);
            cartPage.FillPlaceOrder();
            cartPage.ConfirmAssert();
        }
        [TestCase]
        public void TestBuyMonitor()
        {
            string itemName = "ASUS Full HD";
            string priceValue = "230";
            string itemCategori = "Monitors";
            homepage = new HomePage(setUpWebDriver);
            homepage.ClickLogin();
            loginpage = new LoginPage(setUpWebDriver);
            prodPage = new ProdPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            loginpage.FillformClick();
            homepage.WaitUserName();
            homepage.NameAssert();
            homepage.ClickCategori(itemCategori, itemName);
            prodPage.BtnAssert();
            prodPage.WaitAddCard();
            homepage.ClickCart();
            cartPage.WaitProducts();
            cartPage.PriceAssert(priceValue);
            cartPage.FillPlaceOrder();
            cartPage.ConfirmAssert();
        }
        [TestCase]
        public void TestProducts()
        {

            string firstProduct = "ASUS Full HD";
            string firstCategori = "Monitors";
            string secondProduct = "Apple monitor 24";

            homepage = new HomePage(setUpWebDriver);
            homepage.ClickLogin();
            loginpage = new LoginPage(setUpWebDriver);
            prodPage = new ProdPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            loginpage.FillformClick();
            homepage.WaitUserName();
            homepage.ClickCategori(firstCategori, firstProduct);
            prodPage.BtnAssert();
            prodPage.WaitAddCard();
            homepage.ClickHome();
            homepage.ClickCategori(firstCategori, secondProduct);
            prodPage.BtnAssert();
            prodPage.WaitAddCard();
            homepage.ClickCart();
            cartPage.WaitProducts();
            cartPage.ProductsAssert(firstProduct, secondProduct);
        }
        [TestCase]
        public void TestDelete() 
        {
            string productDelete = "Apple monitor 24";
            homepage = new HomePage(setUpWebDriver);
            homepage.ClickLogin();
            loginpage = new LoginPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            loginpage.FillformClick();
            homepage.WaitUserName();
            homepage.ClickCart();
            cartPage.DeleteItem(productDelete);
        }
    }
}
