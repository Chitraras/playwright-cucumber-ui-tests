import { Page } from 'playwright';
import { footerData } from '../Test-Data/footerData';

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
}

export default FooterPage;
