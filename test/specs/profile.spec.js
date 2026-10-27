const { expect } = require("chai");
const user = require("../data/user");
const authPage = require("../pages/auth.page");
const profilePage = require("../pages/profile.page");

describe("Profile", () => {
  beforeEach(async () => {
    await authPage.login(user);
  });

  it("User changes profile information successfully", async () => {
    await profilePage.open();
    await profilePage.waitForFirstName();
    const currentName = await profilePage.firstNameInput.getValue();
    expect(currentName).not.to.equal("");

    const updatedName = currentName === "Nini" ? user.firstName : "Nini";
    await profilePage.updateFirstName(updatedName);
    expect(await profilePage.successAlert.getText()).to.equal(
      "Your profile is successfully updated!",
    );
    expect(await profilePage.firstNameInput.getValue()).to.equal(updatedName);
  });
});
