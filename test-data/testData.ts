import { faker } from '@faker-js/faker';
import type { ContactFormData } from '../types/ContactFormData';

export const generateContactFormData = (): ContactFormData => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
});
