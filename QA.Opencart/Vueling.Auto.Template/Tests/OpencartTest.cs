using AventStack.ExtentReports;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Opencart.Auto.WebPages;
using Opencart.Auto.Common;
using OpenQA.Selenium.Support.UI;
using OpenQA.Selenium;
using System.Xml.Linq;
using System.Threading;
using Opencart.Auto.SetUp;
using Opencart.Auto.Tests;
using static Opencart.Auto.Common.Helpers;

namespace Opencart.Auto.Tests
{
    [TestFixture]
    class OpencartTests : TestSetCleanBase
    {
        [TestCase]
        public void RegisterTest()
        {
            string randomEmail = RandomEmailGenerator.GetRandomEmail();
            opencartHomePage = new OpencartHomePage(setUpWebDriver);
            registerPage = new RegisterPage(setUpWebDriver);
            opencartHomePage.HomeAcces();
            opencartHomePage.RegisterAcces();
            registerPage.FillForm(randomEmail);
        }
        [TestCase]
        public void LoginTest()
        {
            string newUser = "paco@mail.com";
            string pass = "Hola1234!";
            opencartHomePage = new OpencartHomePage(setUpWebDriver);
            loginPage = new LoginPage(setUpWebDriver);
            accountPage = new AccountPage(setUpWebDriver);
            opencartHomePage.HomeAcces();
            opencartHomePage.LoginAcces();
            loginPage.FillLogin(newUser, pass);
            Assert.AreEqual("My Account", accountPage.GetMyAccount());
        }
        [TestCase]
        public void AddProductsAndCheckout()
        {
            string randomEmail = RandomEmailGenerator.GetRandomEmail();
            opencartHomePage = new OpencartHomePage(setUpWebDriver);
            registerPage = new RegisterPage(setUpWebDriver);
            loginPage = new LoginPage(setUpWebDriver);
            accountPage = new AccountPage(setUpWebDriver);
            tabletsPage = new TabletsPage(setUpWebDriver);
            productPage = new ProductPage(setUpWebDriver);
            camerasPage = new CamerasPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            checkoutPage = new CheckoutPage(setUpWebDriver);
            opencartHomePage.HomeAcces();
            opencartHomePage.RegisterAcces();
            registerPage.FillForm(randomEmail);
            accountPage.goHome();
            opencartHomePage.goTablets();
            tabletsPage.ViewSamsung();
            Assert.AreEqual("Samsung Galaxy Tab 10.1", productPage.GetProductName());
            productPage.AddtoCard();
            productPage.goCameras();
            camerasPage.Viewcanon();
            productPage.Options();
            productPage.AddtoCard();
            productPage.goCart();
            Assert.AreEqual("Canon EOS 5D", cartPage.GetFirstProduct());
            Assert.AreEqual("Samsung Galaxy Tab 10.1", cartPage.GetSecondProduct());
            cartPage.goCheckout();
            checkoutPage.fillCheckout();
            Assert.AreEqual("Your order has been placed!", checkoutPage.GetTxtAlert());
            checkoutPage.exitOrder();
        }
        [TestCase]
        public void DeleteProduct()
        {
            string randomEmail = RandomEmailGenerator.GetRandomEmail();
            opencartHomePage = new OpencartHomePage(setUpWebDriver);
            registerPage = new RegisterPage(setUpWebDriver);
            loginPage = new LoginPage(setUpWebDriver);
            accountPage = new AccountPage(setUpWebDriver);
            tabletsPage = new TabletsPage(setUpWebDriver);
            productPage = new ProductPage(setUpWebDriver);
            camerasPage = new CamerasPage(setUpWebDriver);
            cartPage = new CartPage(setUpWebDriver);
            checkoutPage = new CheckoutPage(setUpWebDriver);
            opencartHomePage.HomeAcces();
            opencartHomePage.RegisterAcces();
            registerPage.FillForm(randomEmail);
            accountPage.goHome();
            opencartHomePage.goTablets();
            tabletsPage.ViewSamsung();
            Assert.AreEqual("Samsung Galaxy Tab 10.1", productPage.GetProductName());
            productPage.AddtoCard();
            productPage.goCart();
            Assert.AreEqual("Samsung Galaxy Tab 10.1", cartPage.GetSecondProduct());
            cartPage.deleteitem();
            
        }
        [TestCase]
        public void TestCheckSponsor()
        {
            string sponsor = "Nintendo";
            opencartHomePage = new OpencartHomePage(setUpWebDriver);
            opencartHomePage.HomeAcces();
            opencartHomePage.FindSponsor(sponsor);

        }
    }
}
