import { faker } from '@faker-js/faker';
import { contactFormType } from '../types/contactFormType';

export const contactFormData: contactFormType = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    message: faker.lorem.sentence(),
};
