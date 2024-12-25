const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

(async function testVideoPlayback() {
  // Set up the WebDriver (Assuming ChromeDriver is installed)
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the page containing the video list
    await driver.get("http://localhost:1324"); // Replace with your app's URL

    // Wait for the page to load
    await driver.sleep(2000);

    // Find the video item by class (video-item containing video)
    let videoItem = await driver.findElement(
      By.xpath(
        "//div[@class='video-list']//div[@class='video-item'][contains(., 'tepesco peior aperio')]"
      )
    );

    // Click on the video item to play it
    await videoItem.click();

    // Wait for the video player to load
    await driver.sleep(3000);

    // Find the video player element on the page (assumes it's a <video> tag)
    let videoPlayer = await driver.findElement(By.tagName("video"));

    // Check if the video is playing (by checking the 'paused' property)
    let isPaused = await driver.executeScript(
      "return arguments[0].paused;",
      videoPlayer
    );

    // Assert that the video is NOT paused, meaning it's playing
    assert.strictEqual(isPaused, false, "The video is not playing.");

    // Optionally, print success message
    console.log("The video is playing successfully.");
  } finally {
    // Close the browser after the test
    await driver.quit();
  }
})();
