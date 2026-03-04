import { test as base } from '@playwright/test';
import ContactFormPage from '../page-object-models/pages/ContactFormPage';

type BaseFixture = {
    contactFormPage: ContactFormPage;
};

export const test = base.extend<BaseFixture>({
    contactFormPage: async ({ page }, use) => {
        await use(new ContactFormPage(page));
    },
});

export { expect } from '@playwright/test';
