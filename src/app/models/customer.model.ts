export class Customer {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: string;
}

export class Customers {
    customer: Customer[];
}