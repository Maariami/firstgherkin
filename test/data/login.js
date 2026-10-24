const { expect } = require("chai");
const user = require("../data/user");

async function login() {
  await browser.url("/auth/login");
  await $("#email").setValue(user.email);
  await $("#password").setValue(user.password);
  await $(".btnSubmit").click();

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes("/account"),
    { timeoutMsg: "Login failed: not redirected to account page" }
  );
  expect(await browser.getUrl()).to.contain("/account");
}

module.exports = { login };