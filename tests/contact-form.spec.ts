import { expect, test } from '../fixtures/BaseFixture';
import { generateContactFormData } from '../test-data/testData';

test.describe('Contact form', () => {
    test('fill in the form and submit - happy path', async ({ page, contactFormPage }) => {
        const validFormData = generateContactFormData();
        const responsePromise = page.waitForResponse(
            (response) =>
                response.url().includes('/wp-admin/admin-ajax.php') &&
                response.request().method() === 'POST',
        );

        await contactFormPage.goto();
        await contactFormPage.fillAndSubmit(validFormData);

        const response = await responsePromise;

        expect(response.ok()).toBeTruthy();
        await expect(contactFormPage.successMessage).toBeVisible();
        await expect(contactFormPage.errorMessage).toBeHidden();
    });

    test('fill in the form and submit - 500 Internal Server Error', async ({
        page,
        contactFormPage,
    }) => {
        const invalidformData = generateContactFormData();

        await page.route('**/wp-admin/admin-ajax.php', (route) =>
            route.fulfill({
                status: 500,
                body: JSON.stringify({
                    success: false,
                    data: { message: 'Internal Server Error.', data: [] },
                }),
            }),
        );

        await contactFormPage.goto();
        await contactFormPage.fillAndSubmit(invalidformData);

        await expect(contactFormPage.errorMessage).toBeVisible();
        await expect(contactFormPage.successMessage).toBeHidden();
    });
});
