import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { ConsultationPage } from '../Pages/consulatationPage';
import { CustomWorld } from '../support/world';

let consultationPage: ConsultationPage;

Given('the consultation page is loaded', async function (this: CustomWorld) {
    consultationPage = new ConsultationPage(this.page);
    await consultationPage.navigateToConsultationPage();
    console.log('Navigated to Consultation Page');
});

When('the user clicks the Book My Session CTA button', async function (this: CustomWorld) {
    const isVisible = await consultationPage.checkBookMySessionCTAExists();
    assert.ok(isVisible, 'Book My Session CTA is not visible');
    await consultationPage.clickBookMySessionCTA();
});

Then('the user scrolls up to the take your First Step section', async function (this: CustomWorld) {
    await consultationPage.scrollToFirstStepSection();

    const sectionVisible = await consultationPage.checkFirstStepSectionVisible();
    assert.ok(sectionVisible, 'Take Your First Step section is not visible');

    const inViewport = await consultationPage.isFirstStepSectionInViewport();
    assert.ok(inViewport, 'Take Your First Step section is not scrolled into view');
});

When('the user clicks the Take Your First Step CTA button', async function (this: CustomWorld) {
    const ctaVisible = await consultationPage.checkTryYourFirstStepCTAExists();
    assert.ok(ctaVisible, 'Take Your First Step CTA is not visible');
    await consultationPage.clickTryYourFirstStepCTA();
});

Then('the user scrolls down to the bottom of Book your 15-minute consultation CTA button', async function (this: CustomWorld) {
    await consultationPage.scrollToBottomBookingCTA();

    const ctaVisible = await consultationPage.checkBottomBookMySessionCTAExists();
    assert.ok(ctaVisible, 'Bottom Book My Session CTA is not visible');

    const inViewport = await consultationPage.isBottomBookingCTAInViewport();
    assert.ok(inViewport, 'Bottom Book My Session CTA is not scrolled into view');

});

When('the user clicks the Book My Session CTA button at the bottom', async function (this: CustomWorld) {
    const ctaVisible = await consultationPage.checkBottomBookMySessionCTAExists();
    assert.ok(ctaVisible, 'Bottom Book My Session CTA is not visible');
    await consultationPage.clickBottomBookMySessionCTA();
});

Then('the booking section should be displayed', async function (this: CustomWorld) {
    const inViewport = await consultationPage.isBookingSectionInViewport();
    assert.ok(inViewport, 'Booking section is not scrolled into view');

    const bookingSectionVisible = await consultationPage.checkBookingSectionVisible();
    assert.ok(bookingSectionVisible, 'Booking section is not visible after clicking the CTA');

    const dropdownVisible = await consultationPage.checkTimeZoneDropdownExists();
    assert.ok(dropdownVisible, 'Booking section timezone dropdown is not visible');  
});

