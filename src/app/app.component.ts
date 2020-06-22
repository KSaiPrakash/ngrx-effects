import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './helpers/must-match.validator';
import { Observable } from 'rxjs';
import { Customer, Customers } from './models/customer.model';
import { Store } from '@ngrx/store';
import * as CustomerActions from './store/actions/customer.action';
import { CustomerService } from './shared/services/customer.service';
import * as CustomerActionTypes from './store/actions/customer.action';
import * as CustomerReducer from './store/reducers/customer.reducer';
import { selectAllCustomers, getSelectedCustomer } from './store/reducers/customer.reducer';
@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    //customers$: Observable<Customers[]>;
    customers;
    constructor(private formBuilder: FormBuilder,
                private store: Store<{ customers: Customer[] }>,
                private customerService: CustomerService) {   }

    /** Angular lifecycle hooks */
    ngOnInit() {
        this.getAllCustomers();
        this.registerForm = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }
    /** End of Angular lifecycle hooks block */

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        this.AddCustomer(this.registerForm);
        // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        // this.store.dispatch(new CustomerActionTypes.GetCustomer());
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    AddCustomer(registerForm: FormGroup) {
        const customer = new Customer();
        customer.firstName = this.registerForm.value.firstName;
        customer.lastName = this.registerForm.value.lastName;
        customer.email = this.registerForm.value.email;
        customer.title = this.registerForm.value.title;
        customer.password = this.registerForm.value.password;
        customer.confirmPassword = this.registerForm.value.confirmPassword;
        customer.acceptTerms = this.registerForm.value.acceptTerms;
        this.store.dispatch(new CustomerActions.CustomerAdd(customer));
        this.postCustomer(customer)
    }
    getAllCustomers() {
        this.store.select(selectAllCustomers).subscribe(res => {
            console.log(res);
            this.customers = res;
        });
    }
    postCustomer(customer: Customer) {
        this.customerService.postCustomer(customer);
    }
}