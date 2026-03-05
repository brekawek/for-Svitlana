import { type Page } from '@playwright/test';
import type { ContactFormData } from '../../types/ContactFormData';

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

    async goto() {
        await this.page.goto('');
    }

    async fillAndSubmit(formData: ContactFormData) {
        await this.nameInput.fill(formData.name);
        await this.emailInput.fill(formData.email);
        await this.messageInput.fill(formData.message);
        await this.submitButton.click();
    }
}
