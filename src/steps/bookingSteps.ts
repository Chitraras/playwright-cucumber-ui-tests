import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import BookingPage from '../Pages/bookingPage';
import { bookingData } from '../Test-Data/bookingData';

Then('Select a session with avaiable slot', async function (this: CustomWorld) {
    const page = new BookingPage(this.page);
    await page.selectSessionWithAvailableSlot();
    await page.clickBookMySlotCTA();
});

When('the user fills the booking form with booking test data', async function (this: CustomWorld) {
    const page = new BookingPage(this.page);
    await page.fillPrimaryDetails(
        bookingData.bookingTestName,
        bookingData.bookingTestEmail,
        bookingData.bookingTestPhone,
    );
});

When('the user submits the booking form', async function (this: CustomWorld) {
    const page = new BookingPage(this.page);
    await page.submitPrimaryDetails();
});

Then('the user clicks the OTP verification CTA', async function (this: CustomWorld) {
    const page = new BookingPage(this.page);
    await page.clickOtpVerification();
});

When('the user fills additional booking details', async function (this: CustomWorld) {
    const page = new BookingPage(this.page);
    await page.fillAdditionalDetails({
        gender: bookingData.bookingTestGender,
        pronouns: bookingData.bookingTestPronouns,
        referral: bookingData.bookingTestReferral,
        language: bookingData.bookingTestLanguage,
        details: bookingData.bookingTestConsultationDetails,
        consent: bookingData.bookingTestConsent,
        agreeTerms: bookingData.bookingTestAgreeTerms,
    });
});
