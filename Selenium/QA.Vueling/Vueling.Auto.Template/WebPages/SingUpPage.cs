using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketsVueling.Auto.SetUp;
using TicketsVueling.Auto.WebPages;
using TicketsVueling.Auto.WebPages.Base;

namespace TicketsVueling.Auto.Tests
{
    public class SingUpPage : CommonPage
    {
        public SingUpPage(ISetUpWebDriver setUpWebDriver) : base(setUpWebDriver)
        {
        }
        protected override IWebElement ApartadosBusqueda => throw new System.NotImplementedException();
        private IWebElement inputName
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxFirstName"); }
        }
        private IWebElement inputLastName
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxLastName"); }
        }
        private IWebElement inputEmail
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_TextBoxEmail"); }
        }
        private IWebElement inputPassword
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_MemberInputRegisterView_PasswordFieldAgentPassword"); }
        }
        private IWebElement inputConfirmPassword
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_MemberInputRegisterView_PasswordFieldPasswordConfirm"); }
        }
        private IWebElement selectFirstQuestion
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_FirstQuestion"); }
        }
        private IWebElement inputFirstQuestion
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_FirstAnswer"); }
        }
        private IWebElement optionsFirstQuestion(int randomNum)
        {
            return WebDriver.FindElementByXPath("//select[contains(@id,'First')]/option["+randomNum+"]"); 
        }
        private IWebElement selectSecondQuestion
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_SecondQuestion"); }
        }
        private IWebElement inputSecondQuestion
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_SecurityQuestionsRegisterView_SecondAnswer"); }
        }
        private IWebElement optionsSecondQuestion(int randomNum)
        {
            return WebDriver.FindElementByXPath("//select[contains(@id,'Second')]/option["+randomNum+"]");
        }
        private IWebElement checkBoxPromotions
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_PersonInputRegisterView_CheckBoxPromoOpt"); }
        }
        private IWebElement checkBoxTerms
        {
            get { return WebDriver.FindElementById("CONTROLGROUPREGISTERVIEW_LegalConditionsCheckbox"); }
        }
        

        public SingUpPage FillSingUpForm(int randomInt, string randomString)
        {
            inputName.SendKeys("Paco");
            inputLastName.SendKeys("Alcacer");
            inputEmail.SendKeys("paquitoloco@mail.com");
            inputPassword.SendKeys("Password123!");
            inputConfirmPassword.SendKeys("Password123!");
            selectFirstQuestion.Click();
            optionsFirstQuestion(randomInt).Click();
            inputFirstQuestion.SendKeys(randomString);
            optionsSecondQuestion(randomInt).Click();
            inputSecondQuestion.SendKeys(randomString);

            Jse2.ExecuteScript("arguments[0].click();", checkBoxPromotions);
            Jse2.ExecuteScript("arguments[0].click();", checkBoxTerms);
            //checkBoxPromotions.Click();
            //checkBoxTerms.Click();
            WebDriver.Navigate().GoToUrl("https://www.vueling.com");
            return this;
        }
    }
}
