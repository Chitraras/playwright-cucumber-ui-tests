export const footerData = {
    // Footer root selector — adjust if your app uses a different element
    footerSelector: '//div[contains(@class, "grid-cols-1")]',

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
        twitter: 'a[aria-label="Twitter"], a[title*="Twitter"], a[href*="twitter.com"]',
        facebook: 'a[aria-label="Facebook"], a[title*="Facebook"], a[href*="facebook.com"]',
    }
};

export default footerData;
