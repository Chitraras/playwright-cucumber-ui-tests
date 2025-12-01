import { FrameLocator, Locator, Page } from 'playwright';
import { bookingData } from '../Test-Data/bookingData';

export class BookingPage {
    constructor(private readonly page: Page) {}

    private async frameTarget(): Promise<Page | FrameLocator> {
        const iframeCount = await this.page.locator(bookingData.bookingIframeSelector).count();
        return iframeCount > 0 ? this.page.frameLocator(bookingData.bookingIframeSelector) : this.page;
    }

    async clickBookMySlotCTA() {
        await this.page.locator(bookingData.calendarBookingCTA).first().click();
    }

    async selectSessionWithAvailableSlot() {
        const slots = this.page.locator(bookingData.sessionSlotOptions);
        const count = await slots.count();
        for (let index = 0; index < count; index += 1) {
            const slot = slots.nth(index);
            const disabled = await slot.getAttribute('aria-disabled');
            if (disabled !== 'true') {
                await slot.click();
                return;
            }
        }
        throw new Error('No available session slots found');
    }

    async fillPrimaryDetails(name: string, email: string, phone: string, timezone?: string) {
        const target = await this.frameTarget();
        await target.locator(bookingData.bookingNameInput).first().fill(name);
        await target.locator(bookingData.bookingEmailInput).first().fill(email);
        await target.locator(bookingData.bookingPhoneInput).first().fill(phone);
        if (timezone) {
            const timezoneSelect = target.locator(bookingData.bookingTimezoneSelect);
            if ((await timezoneSelect.count()) === 0) {
                throw new Error('Booking timezone selector not found');
            }
            await this.selectOptionWithFallback(timezoneSelect.first(), [
                { label: timezone },
                { value: timezone },
            ]);
        }
    }

    async submitPrimaryDetails() {
        const target = await this.frameTarget();
        await target.locator(bookingData.bookingSubmitButton).first().click();
    }

    async clickOtpVerification() {
        const target = await this.frameTarget();
        const button = target.locator(bookingData.otpVerificationButton);
        if ((await button.count()) === 0) {
            return;
        }
        await button.first().click();
    }

    async fillAdditionalDetails(options: {
        gender?: string;
        pronouns?: string;
        referral?: string;
        language?: string;
        details?: string;
        consent?: boolean;
        agreeTerms?: boolean;
    }) {
        const target = await this.frameTarget();

        if (options.gender) {
            const locator = target.locator(bookingData.bookingGenderSelect);
            if ((await locator.count()) === 0) {
                throw new Error('Gender selector not found');
            }
            await this.selectOptionWithFallback(locator.first(), [
                { value: options.gender.toLowerCase() },
                { label: options.gender },
            ]);
        }

        if (options.pronouns) {
            const locator = target.locator(bookingData.bookingPronounsSelect);
            if ((await locator.count()) === 0) {
                throw new Error('Pronouns selector not found');
            }
            const normalized = options.pronouns.toLowerCase().replace(/\//g, '-');
            await this.selectOptionWithFallback(locator.first(), [
                { value: normalized },
                { value: options.pronouns.toLowerCase() },
                { label: options.pronouns },
            ]);
        }

        if (options.referral) {
            const locator = target.locator(bookingData.bookingReferralSelect);
            if ((await locator.count()) === 0) {
                throw new Error('Referral selector not found');
            }
            await this.selectOptionWithFallback(locator.first(), [
                { value: options.referral.toLowerCase() },
                { label: options.referral },
            ]);
        }

        if (options.language) {
            const locator = target.locator(bookingData.bookingLanguageInput).first();
            await locator.fill(options.language);
        }

        if (options.details) {
            const locator = target.locator(bookingData.bookingConsultationDetailsTextarea).first();
            await locator.fill(options.details);
        }

        if (options.consent) {
            const checkbox = target.locator(bookingData.bookingConsentCheckbox).first();
            if (!(await checkbox.isChecked())) {
                await checkbox.check();
            }
        }

        if (options.agreeTerms) {
            const checkbox = target.locator(bookingData.bookingTermsCheckbox).first();
            if (!(await checkbox.isChecked())) {
                await checkbox.check();
            }
        }
    }

    private async selectOptionWithFallback(locator: Locator, attempts: Array<{ value?: string; label?: string }>) {
        let lastError: unknown;
        for (const attempt of attempts) {
            try {
                await locator.selectOption(attempt);
                return;
            } catch (error) {
                lastError = error;
            }
        }
        const reason = lastError instanceof Error ? lastError.message : String(lastError ?? 'unknown error');
        throw new Error(`Unable to select option for provided locator: ${reason}`);
    }
}

export default BookingPage;
