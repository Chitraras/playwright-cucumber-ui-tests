import { Page } from 'playwright';
import { consultationData } from '../Test-Data/consultationData';

export  class ConsultationPage {
    private page: Page;
    private url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = consultationData.consultationPageURL;
    }

    async navigateToConsultationPage() {
        await this.page.goto(this.url);
    }

//CTA Button Click Methods on consultation page
    
    async clickTryYourFirstStepCTA() {
        await this.page.click(consultationData.firstStepCTAButton);
    }

    async clickBookMySessionCTA() {
        await this.page.click(consultationData.bookMySessionButton);
    }

    async scrollToBottomBookingCTA() {
        const target = this.page.locator(consultationData.bottomBookMySessionButton).first();
        await target.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
    }

    async clickBottomBookMySessionCTA() {
        await this.page.click(consultationData.bottomBookMySessionButton);
    }

    async scrollToFirstStepSection() {
        const target = this.page.locator(consultationData.firstStepSectionHeading).first();
        await target.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
    }

    // Get Free Resources popup interactions
    async scrollToGetResourcesCTA() {
        const target = this.page.locator(consultationData.getResourcesCTAButton).first();
        await target.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(300);
    }

    async checkGetResourcesCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.getResourcesCTAButton);
    }

    async clickGetResourcesCTA() {
        await this.page.click(consultationData.getResourcesCTAButton);
    }

    async checkGetResourcesPopupVisible(): Promise<boolean> {
        return await this.page.isVisible(consultationData.getResourcesPopUp);
    }
    async clickCloseResourcesButton() {
        await this.page.click(consultationData.closeResourcesButton);
    }

    /**
     * Waits for the resources popup to reach the expected state (visible/hidden)
     * then returns the current visibility state. Use `expected=true` to wait
     * for visibility, `expected=false` to wait for it to hide.
     */
    async isGetResourcesPopupVisible(expected: boolean = true, timeout: number = 5000): Promise<boolean> {
        const popup = this.page.locator(consultationData.getResourcesPopUp);
        try {
            await popup.waitFor({ state: expected ? 'visible' : 'hidden', timeout });
        } catch (error) {
            // ignore timeout — we'll return the current visibility state below
        }

        return await popup.isVisible();
    }

    async enterResourceName(name: string) {
        await this.page.fill(consultationData.enterNameInput, name);
    }

    async enterResourceEmail(email: string) {
        await this.page.fill(consultationData.enterEmailInput, email);
    }

    async clickSubmitResourcesButton() {
        await this.page.click(consultationData.submitResourcesButton);
    }

// Verification Methods on consultation page
    async checkBookingCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.bookConsultationCTA);
    }

    async checkTryYourFirstStepCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.firstStepCTAButton);
    }

    async checkBookMySessionCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.bookMySessionButton);
    }

    async checkTimeZoneDropdownExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.timezoneSelector);
    }

    async checkBookingSectionVisible(): Promise<boolean> {
        if (await this.page.isVisible(consultationData.bookingSectionContainer)) {
            return true;
        }
        return await this.page.isVisible(consultationData.bookingSectionHeading);
    }

    async checkBottomBookMySessionCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.bottomBookMySessionButton);
    }

    async checkFirstStepSectionVisible(): Promise<boolean> {
        if (await this.page.isVisible(consultationData.firstStepSectionContainer)) {
            return true;
        }
        if (await this.page.isVisible(consultationData.firstStepSectionHeading)) {
            return true;
        }
        return await this.page.isVisible(consultationData.firstStepSectionSubheading);
    }

    async isBookingSectionInViewport(): Promise<boolean> {
        const subheadingLocator = this.page.locator(consultationData.bookingSectionSubheading);
        if ((await subheadingLocator.count()) === 0) {
            return false;
        }

        const target = subheadingLocator.first();
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
                    return true;
                }
            } catch (error) {
                // Ignore transient DOM detaches and retry until timeout.
            }

            await this.page.waitForTimeout(100);
        }

        return false;
    }

    async isFirstStepSectionInViewport(): Promise<boolean> {
        const containers = this.page.locator(consultationData.firstStepSectionContainer);
        if ((await containers.count()) === 0) {
            return false;
        }

        const target = containers.first();
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
                    return true;
                }
            } catch (error) {
                // Ignore transient detach errors and retry.
            }

            await this.page.waitForTimeout(100);
        }

        return false;
    }

    async isBottomBookingCTAInViewport(): Promise<boolean> {
        const ctaLocator = this.page.locator(consultationData.bottomBookMySessionButton);
        if ((await ctaLocator.count()) === 0) {
            return false;
        }
        const target = ctaLocator.first();
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
                    return true;
                }
            } catch (error) {
                // Ignore DOM detach errors and retry until timeout.
            }
            await this.page.waitForTimeout(100);
        }
        return false;
    }

}
