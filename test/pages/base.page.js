class BasePage {
  open(path = "/") {
    return browser.url(path);
  }

  waitForUrl(path) {
    return browser.waitUntil(async () => (await browser.getUrl()).includes(path), {
      timeoutMsg: `Expected URL to include "${path}"`,
    });
  }

  async click(element) {
    await element.scrollIntoView();
    await element.waitForClickable();
    await element.click();
  }
}

module.exports = BasePage;
