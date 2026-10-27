const BasePage = require("./base.page");

class HomePage extends BasePage {
  get languageSelector() {
    return $("#language");
  }

  get cartLink() {
    return $('[aria-label="cart"]');
  }

  get menuButton() {
    return $("#menu");
  }

  async changeLanguage(option) {
    await this.click(this.languageSelector);
    await this.click($(`[data-test="lang-${option.toLowerCase()}"]`));
  }

  get language() {
    return $("html").getAttribute("lang");
  }

  async openCart() {
    await this.click(this.cartLink);
  }

  async openMenu() {
    await this.click(this.menuButton);
  }
}

module.exports = new HomePage();
