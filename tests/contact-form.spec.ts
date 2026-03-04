import { expect, test } from '../fixtures/BaseFixture';
import { contactFormData } from '../test-data/testData';

test.describe('Contact form', () => {
    test('fill in the form and submit - happy path', async ({ page, contactFormPage }) => {
        const validFormData = { ...contactFormData };
        const responsePromise = page.waitForResponse(
            (response) =>
                response.url().includes('/wp-admin/admin-ajax.php') &&
                response.request().method() === 'POST',
        );

        await contactFormPage.goToContactFormPage();
        await contactFormPage.fillForm(validFormData);

        const response = await responsePromise;

        expect(response.ok()).toBeTruthy();
        await expect(contactFormPage.successMessage).toBeVisible();
        await expect(contactFormPage.errorMessage).toBeHidden();
    });

    test('fill in the form and submit - 500 Internal Server Error', async ({
        page,
        contactFormPage,
    }) => {
        const validFormData = { ...contactFormData };

        await page.route('*/**/wp-admin/admin-ajax.php', (route) => {
            return route.fulfill({
                status: 500,
                body: 'Internal Server Error',
            });
        });

        await contactFormPage.goToContactFormPage();
        await contactFormPage.fillForm(validFormData);

        await expect(contactFormPage.errorMessage).toBeVisible();
        await expect(contactFormPage.successMessage).toBeHidden();
    });
});
