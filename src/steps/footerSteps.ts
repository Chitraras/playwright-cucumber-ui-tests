import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import FooterPage from '../Pages/footerPage';
import { footerData } from '../Test-Data/footerData';
import { CustomWorld } from '../support/world';

Given('scrolls to the footer', async function (this: CustomWorld) {
    // Create a page object instance per scenario using the world
    const footerPage = new FooterPage(this.page); // or new FooterPage(this.driver) depending on your world
    await footerPage.scrollToFooter();
});

Then('the footer should be visible', async function (this: CustomWorld) {
    const footerPage = new FooterPage(this.page);
    const isVisible = await footerPage.isFooterVisible();
    assert.ok(isVisible, 'Footer is not visible');
});

Then('verify the page selection link for {string}', async function (this: CustomWorld, linkText: string) {
    const footerPage = new FooterPage(this.page);
    // const element = `text=${linkText}`;
    await footerPage.clickLinkByText(linkText);
    await footerPage.validatePageNavigation(linkText);
    await footerPage.scrollToFooter();
});

Then('verify the footer contact information is displayed', async function (this: CustomWorld) {
    const footerPage = new FooterPage(this.page);
    await footerPage.validateContactInfoDisplayed();

});

Then('verify the social media icons are visible', async function (this: CustomWorld) {
    const footerPage = new FooterPage(this.page);
    const twitterVisible = await footerPage.isSocialIconVisible('instagram');
    assert.ok(twitterVisible, 'Twitter icon is not visible in the footer');
    const youtubeVisible = await footerPage.isSocialIconVisible('youtube');
    assert.ok(youtubeVisible, 'YouTube icon is not visible in the footer');
    // const facebookVisible = await footerPage.isSocialIconVisible('facebook');
    // assert.ok(facebookVisible, 'Facebook icon is not visible in the footer');
    // const linkedinVisible = await footerPage.isSocialIconVisible('linkedin');
    // assert.ok(linkedinVisible, 'LinkedIn icon is not visible in the footer');
    
});