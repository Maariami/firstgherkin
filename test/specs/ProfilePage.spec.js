const { expect } = require("chai");
const { login } = require("../data/login");
const user = require("../data/user");



describe("Profile page Features", () => {
  beforeEach(async () => {
    await browser.url("/");
    await login();
  });

  it("User changes profile information successfully", async () => {
  
    const link = await $('//a[contains(text(), "Profile")]');
    await link.waitForClickable({ timeout: 5000 });
    await link.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account/profile"),
      { timeoutMsg: "Not redirected to profile page" }
    );

    await browser.waitUntil(
      async () => (await $("#first_name").getValue()) !== "",
      { timeoutMsg: "first name was not populated" }
    );

    const nameinpt = await $("#first_name")
    const name= await nameinpt.getValue()
    expect(name).to.equal(user.firstName);
    
    await nameinpt.setValue('Nini')
    await $('//button[contains(text(),"Update Profile ")]').click()
    const alert=$('.alert-success');
    await alert.waitForDisplayed({timeout:5000});
    expect(await alert.getText()).to.equal('Your profile is successfully updated!')
  });
});