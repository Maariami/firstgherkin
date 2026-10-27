# First Gherkin

WebdriverIO and Mocha end-to-end tests for [Practice Software Testing](https://practicesoftwaretesting.com/).

## Run the tests

Install dependencies and make sure Chrome is available, then run:

```sh
npm install
npm test
```

`npm run wdio` runs the same WebdriverIO configuration directly.

## Project structure

```text
features/          Gherkin scenarios grouped by product feature
test/
  data/            Test data and scenario examples
  pages/           Page objects and their selectors
  specs/           Mocha test specs
wdio.conf.js       WebdriverIO configuration
```

The `.feature` files document the Gherkin scenarios. The executable browser tests currently use Mocha and the page objects in `test/pages`.
