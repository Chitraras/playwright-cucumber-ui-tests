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
    const href = await footerPage.getLinkHrefByText(linkText);
    if (!href) throw new Error(`Link with text "${linkText}" not found in footer`);
    await this.page.locator(`a[href="${href}"]`).first().click();
    assert.ok(href && href.length > 0, `Link with text "${linkText}" not found in footer`);
});