const BasePage = require("./base.page");

class AuthPage extends BasePage {
  get firstNameInput() {
    return $("#first_name");
  }

  get lastNameInput() {
    return $("#last_name");
  }

  get dateOfBirthInput() {
    return $("#dob");
  }

  get countrySelect() {
    return $("#country");
  }

  get postalCodeInput() {
    return $("#postal_code");
  }

  get houseNumberInput() {
    return $("#house_number");
  }

  get streetInput() {
    return $("#street");
  }

  get cityInput() {
    return $("#city");
  }

  get stateInput() {
    return $("#state");
  }

  get phoneInput() {
    return $("#phone");
  }

  get emailInput() {
    return $("#email");
  }

  get passwordInput() {
    return $("#password");
  }

  get submitButton() {
    return $(".btnSubmit");
  }

  async openLogin() {
    await this.open("/auth/login");
  }

  async openRegistration() {
    await this.open("/auth/register");
  }

  async login(user) {
    await this.openLogin();
    await this.emailInput.setValue(user.email);
    await this.passwordInput.setValue(user.password);
    await this.click(this.submitButton);
    await this.waitForUrl("/account");
  }

  async register(user) {
    await this.openRegistration();
    await this.firstNameInput.setValue(user.firstName);
    await this.lastNameInput.setValue(user.lastName);
    await this.dateOfBirthInput.setValue(user.dateOfBirth);
    await this.countrySelect.selectByVisibleText(user.country);
    await this.postalCodeInput.setValue(user.postalCode);
    await this.houseNumberInput.setValue(user.houseNumber);
    await this.streetInput.setValue(user.street);
    await this.cityInput.setValue(user.city);
    await this.stateInput.setValue(user.state);
    await this.phoneInput.setValue(user.phone);
    await this.emailInput.setValue(user.email);
    await this.passwordInput.setValue(user.password);
    await this.click(this.submitButton);
    await this.waitForUrl("/auth/login");
  }
}

module.exports = new AuthPage();
