const BasePage = require("./base.page");

class ProfilePage extends BasePage {
  get profileLink() {
    return $('//a[contains(text(), "Profile")]');
  }

  get firstNameInput() {
    return $("#first_name");
  }

  get updateButton() {
    return $('//button[contains(text(),"Update Profile ")]');
  }

  get successAlert() {
    return $(".alert-success");
  }

  async open() {
    await this.profileLink.waitForClickable({ timeout: 5000 });
    await this.click(this.profileLink);
    await this.waitForUrl("/account/profile");
  }

  async waitForFirstName() {
    await browser.waitUntil(async () => (await this.firstNameInput.getValue()) !== "", {
      timeoutMsg: "First name was not populated",
    });
  }

  async updateFirstName(name) {
    await this.firstNameInput.setValue(name);
    await this.click(this.updateButton);
    await this.successAlert.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = new ProfilePage();
