export const footerData = {
    // Footer root selector — adjust if your app uses a different element
    footerSelector: '//div[contains(@class, "grid-cols-1")]',
    howitworks: 'text=Getting started is ',
    features: 'text=Real people,',
    resources: 'text=Not ready to book yet? ',
    booksession: 'text=Pick a time that works for you. Your journey to clarity starts here.',

    contactAddress: 'text=4/20A, Krishna Nagar, 3rd cross street, Porur, Chennai -600116',
    contactEmail: 'text=elevenmindcare@gmail.com',
    contactPhone: 'text=+91 9150722901',

    // Common footer links (visible text used in tests)
    links: {
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms & Conditions',
    },

    // Expected href fragments (tests assert the href contains these)
    expectedHrefContains: {
        contact: 'contact',
        privacy: 'privacy',
        terms: 'terms',
    },

    // Social icons selectors (by aria-label or other stable attribute)
    socialIcons: {
        facebook: ' a[href*="facebook.com"]',
        instagram: ' a[href="https://www.instagram.com/elevenmindcare"]',
        linkedin: 'a[aria-label="LinkedIn"], a[title*="LinkedIn"], a[href*="linkedin.com"]',
        youtube: 'a[href*="https://www.youtube.com/@elevenmindscircle"]',
    }
};

export default footerData;
