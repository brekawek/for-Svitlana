import { Page } from '@playwright/test';
import { contactFormType } from '../../types/contactFormType';

export default class ContactFormPage {
    constructor(private page: Page) {}

    nameInput = this.page.locator('#form-field-name');
    emailInput = this.page.locator('#form-field-email');
    messageInput = this.page.locator('#form-field-message');
    submitButton = this.page.getByRole('button', { name: 'Send' });

    successMessage = this.page
        .getByRole('alert')
        .filter({ hasText: 'Your submission was successful.' });
    errorMessage = this.page.getByRole('alert').filter({ hasText: 'error' });

    async goToContactFormPage() {
        await this.page.goto('');
    }

    async fillForm(formData: contactFormType) {
        await this.nameInput.fill(formData.name);
        await this.emailInput.fill(formData.email);
        await this.messageInput.fill(formData.message);
        await this.submitButton.click();
    }
}
