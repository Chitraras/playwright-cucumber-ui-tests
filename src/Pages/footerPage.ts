import { Page } from 'playwright';
import { footerData } from '../Test-Data/footerData';
import assert from 'assert';

export class FooterPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async scrollToFooter() {
        const target = this.page.locator(footerData.footerSelector).first();
        await target.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
    }

    async isFooterVisible(): Promise<boolean> {
        return await this.page.isVisible(footerData.footerSelector);
    }

    async getLinkHrefByText(linkText: string): Promise<string | null> {
        const locator = this.page.locator(`${footerData.footerSelector} a`, { hasText: linkText }).first();
        if ((await locator.count()) === 0) return null;
        return await locator.getAttribute('href');
    }

    async clickLinkByText(linkText: string) {
        await this.page.click(`${footerData.footerSelector} >> text=${linkText}`);
    }

    async isSocialIconVisible(iconKey: keyof typeof footerData.socialIcons): Promise<boolean> {
        const selector = footerData.socialIcons[iconKey];
        return await this.page.isVisible(selector);
    }

    async validatePageNavigation(linkText: string): Promise<void> {
        const sectionKey = linkText.toLowerCase().replace(/\s+/g, '');
        const navigationSectionSelector = (footerData as any)[sectionKey] || `text=${linkText}`;
        const navigationSection = this.page.locator(navigationSectionSelector);
        if ((await navigationSection.count()) === 0) {
            throw new Error(`Section "${linkText}" not found with selector: ${navigationSectionSelector}`);
        }

        const target = navigationSection.first();
        await target.waitFor({ state: 'visible', timeout: 5000 });

        const deadline = Date.now() + 5000;

        while (Date.now() < deadline) {
            try {
                const isInViewport = await target.evaluate((element) => {
                    const rect = element.getBoundingClientRect();
                    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
                    return rect.top < viewHeight && rect.bottom > 0;
                });

                if (isInViewport) {
                    return;
                }
            } catch (error) {
                // Ignore transient DOM detaches and retry until timeout.
            }

            await this.page.waitForTimeout(100);
        }

        throw new Error(`Section "${linkText}" did not reach the viewport after clicking the footer link`);
    }

    async validateContactInfoDisplayed(): Promise<boolean> {
        const addressVisible = await this.page.isVisible(footerData.contactAddress);
        assert.ok(addressVisible, 'Contact address is not visible in the footer');
        const emailVisible = await this.page.isVisible(footerData.contactEmail);
        assert.ok(emailVisible, 'Contact email is not visible in the footer');
        const phoneVisible = await this.page.isVisible(footerData.contactPhone);
        assert.ok(phoneVisible, 'Contact phone is not visible in the footer');
        return addressVisible && emailVisible && phoneVisible;
    }
} 

export default FooterPage;
