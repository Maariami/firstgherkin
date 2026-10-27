const { expect, assert } = require("chai");
const user = require("../data/user");
const languages = require("../data/languages");
const authPage = require("../pages/auth.page");
const homePage = require("../pages/home.page");
const chai = require("chai");
chai.should();

describe("Authentication", () => {
  beforeEach(async () => {
    await homePage.open();
  });

  it("User registers successfully", async () => {
    await authPage.register(user);

    const browserUrl = await browser.getUrl();
    expect(browserUrl).to.contain("/login");
  });

  it("User logs in successfully", async () => {
    await authPage.login(user);

    const browserUrl = await browser.getUrl();
    assert.include(browserUrl, "/account");
  });

  languages.forEach((lang) => {
    it(`User changes language to ${lang.language} successfully`, async () => {
      await homePage.changeLanguage(lang.option);
      await browser.waitUntil(
        async () => (await homePage.language) === lang.option.toLowerCase(),
        { timeoutMsg: `lang attribute did not change to ${lang.option}` },
      );
      const webLang = await homePage.language;
      webLang.should.equal(lang.option.toLowerCase());
    });
  });
});
