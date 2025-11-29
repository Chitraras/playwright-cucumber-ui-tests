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

Then('the booking section should be displayed', async function (this: CustomWorld) {
    const inViewport = await consultationPage.isBookingSectionInViewport();
    assert.ok(inViewport, 'Booking section is not scrolled into view');

    const bookingSectionVisible = await consultationPage.checkBookingSectionVisible();
    assert.ok(bookingSectionVisible, 'Booking section is not visible after clicking the CTA');

    const dropdownVisible = await consultationPage.checkTimeZoneDropdownExists();
    assert.ok(dropdownVisible, 'Booking section timezone dropdown is not visible');  
});

