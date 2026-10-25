const { expect ,assert} = require("chai");
const { login } = require("../data/login");



describe("Add to favourites",()=>{

    beforeEach(async()=>{
        await browser.url('/')
        await login();
    })

    it('User adds products to favourites successfully',async()=>{
        await $(`//a[contains(text(),"Home")]`).click()
        const productName='Protective Gloves'
        await $(`#search-query`).setValue(productName)
        await $(`//button[contains(text(),"Search")]`).click()
        await $(`//h5[contains(text(),"${productName}")]`).click()
        await $(`#btn-add-to-favorites`).click()    
        
        const succmesg=await $(`.toast-success`).waitForDisplayed()
        expect(succmesg).to.be.true
        await $(`#menu`).click()
        await $(`//a[contains(text(),"favorites")]`).click()
        await $$('[data-test="product-name"]')[0].waitForDisplayed()
        const favourites = await $$('[data-test="product-name"]').map(el => el.getText())        
        assert.include(favourites,productName)
        
    })
})