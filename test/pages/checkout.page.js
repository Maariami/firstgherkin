const BasePage = require("./base.page");

class CheckoutPage extends BasePage {
  get houseNumberInput() {
    return $("#house_number");
  }

  get thirdCheckoutButton() {
    return $('[data-test="proceed-3"]');
  }

  get paymentMethodSelect() {
    return $('[data-test="payment-method"]');
  }

  get finishButton() {
    return $('[data-test="finish"]');
  }

  get successMessage() {
    return $('[data-test="payment-success-message"]');
  }

  get confirmationButton() {
    return $('//button[contains(text(),"Confirm")]');
  }

  get orderConfirmation() {
    return $("#order-confirmation");
  }

  async completeCashOnDelivery(houseNumber) {
    await this.houseNumberInput.waitForDisplayed();
    await this.houseNumberInput.setValue(houseNumber);
    await browser.keys("Tab");
    await browser.waitUntil(
      async () => (await this.houseNumberInput.getValue()) === houseNumber,
      { timeoutMsg: "House number was not entered in the checkout form" },
    );
    await this.thirdCheckoutButton.waitForEnabled({
      timeout: 20000,
      timeoutMsg: "Checkout did not enable after entering the house number",
    });
    await this.click(this.thirdCheckoutButton);
    await this.paymentMethodSelect.selectByAttribute(
      "value",
      "cash-on-delivery",
    );
    await this.click(this.finishButton);
    await this.successMessage.waitForDisplayed();
    const successMessage = await this.successMessage.getText();
    await this.click(this.confirmationButton);
    await this.orderConfirmation.waitForDisplayed();
    return successMessage;
  }
}

module.exports = new CheckoutPage();
