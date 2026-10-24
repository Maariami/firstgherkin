const { expect, assert } = require("chai");
const chai = require("chai");
const user = require('../data/user')
const languages = require('../data/languages')
chai.should()

describe("login page features",()=>{
    beforeEach(async()=>{
        await browser.url('/')
    });


it('User registers successfully',async()=>{
    await browser.url('/auth/register')
    await $('#first_name').setValue(user.firstName)
    await $('#last_name').setValue(user.lasttName)
    await $('#dob').setValue(user.dob)
    await $('#country').selectByVisibleText(user.country)
    await $('#postal_code').setValue(user.postalcode)
    await $('#house_number').setValue(user.houseNumber)
    await $('#street').setValue(user.street)
    await $('#city').setValue(user.city)
    await $('#state').setValue(user.state)
    await $('#phone').setValue(user.phone)
    await $('#email').setValue(user.email)
    await $('#password').setValue(user.password)
    await $('.btnSubmit').click()

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/auth/login'),
    { timeoutMsg: 'Not redirected to login  page' }
    );
    
    const browserUrl=await browser.getUrl()
    expect(browserUrl).to.contain('/login')

});

 it("User logs in successfully", async()=>{
    await browser.url('/auth/login')
    await $('#email').setValue(user.email)
    await $('#password').setValue(user.password)
    await $('.btnSubmit').click()

    await browser.waitUntil(
    async () => (await browser.getUrl()).includes('/account'),
    { timeoutMsg: 'Not redirected to account page' }
    );

    const browserUrl=await browser.getUrl()
   
    assert.include(browserUrl, '/account');   
 })

languages.forEach((lang)=>{
    it(`User changes language to ${lang.language} successfully`,async()=>{
        await $('#language').click();
        await $(`[data-test="lang-${lang.option.toLowerCase()}"]`).click();       
        await browser.waitUntil(
        async () => (await $("html").getAttribute("lang")) === lang.option.toLowerCase(),
        { timeoutMsg: `lang attribute did not change to ${lang.option}` }
         );
         const webLang=await $("html").getAttribute("lang")
        webLang.should.equal(lang.option.toLowerCase());
         })
         
    })
})