using OpenQA.Selenium.Remote;

namespace Level.Auto.SetUp
{
    public interface ISetUpWebDriver
    {
        RemoteWebDriver GetSetUpWebDriver();

        void CloseWebDriver();

        void GoTo(string url);

        bool HasQuit(RemoteWebDriver webDriver);
    }
}
