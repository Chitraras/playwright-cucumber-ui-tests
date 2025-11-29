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
    
    async clickBookingCTA() {
        await this.page.click(consultationData.bookConsultationCTA);
    }

    async clickTryYourFirstStepCTA() {
        await this.page.click(consultationData.firstStepCTAButton);
    }

    async clickBookMySessionCTA() {
        await this.page.click(consultationData.bookConsultationCTA);
    }

    async clickTimeZoneDropdown() {
        await this.page.locator(consultationData.timezoneSelector).click();
    }

    async selectTimeZone(timeZone: string) {
        await this.page.locator(consultationData.timezoneSelector).selectOption({ label: timeZone });
    }

    async clickGivenDatePicker(date:any) {
        await this.page.getByRole('button', { name: String(date) }).click();
    }

    async clickGivenTimeSlot(timeSlot: string) {
        await this.page.getByRole('button', { name: timeSlot }).click();
    }

    async clickGetFreeResourcesCTA() {
        await this.page.click(consultationData.getResourcesButton);
    }

    async clickDownloadResourcesCTA() {
        await this.page.click(consultationData.downloadResourcesButton);
    }

// Input Methods on consultation page
    async enterFullName(fullName: string) {
        await this.page.fill('', fullName);
    }

    async enterEmail(email: string) {
        await this.page.fill('', email);
    }


// Verification Methods on consultation page
    async checkBookingCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.bookConsultationCTA);
    }

    async checkTryYourFirstStepCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.firstStepCTAButton);
    }

    async checkBookMySessionCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.bookConsultationCTA);
    }

    async checkYouTubePlayButtonExists(): Promise<boolean> {
        return await this.page.isVisible('');
    }

    async checkTimeZoneDropdownExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.timezoneSelector);
    }

    async checkTimeZoneSelected(timeZone: string): Promise<boolean> {
        const value = await this.page.locator(consultationData.timezoneSelector).inputValue();
        return value.includes(timeZone);
    }

    async checkDatePickerExists(date: any): Promise<boolean> {
        return await this.page.isVisible('' + date + '');
    }

    async checkTimeSlotExists(timeSlot: string): Promise<boolean> {
        return await this.page.isVisible('' + timeSlot + '');
    }

    async checkGetFreeResourcesCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.getResourcesButton);
    }

    async checkDownloadResourcesCTAExists(): Promise<boolean> {
        return await this.page.isVisible(consultationData.downloadResourcesButton);
    }

    async checkBookingSectionVisible(): Promise<boolean> {
        if (await this.page.isVisible(consultationData.bookingSectionContainer)) {
            return true;
        }
        return await this.page.isVisible(consultationData.bookingSectionHeading);
    }
} 