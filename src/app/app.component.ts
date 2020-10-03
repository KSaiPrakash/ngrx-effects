import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './helpers/must-match.validator';
import { Customer } from './models/customer.model';
import * as CustomerActions from './store/actions/customer.action';
@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    customerCollections;
    customerDataStore;
    constructor(private formBuilder: FormBuilder,
                private store: Store<{ customers: Customer[] }>,
                private firestore: AngularFirestore ) {
                   this.firestore.collection<Customer>('customers').valueChanges().subscribe( res => {
                    if (res) {
                        this.customerCollections = res;
                    }
                });
        }

    /** Angular lifecycle hooks */
    ngOnInit() {
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
        this.writeUpdatedDataToStore();
        this.readUpdatedDataFromStore();
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
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    AddCustomer(registerForm: FormGroup) {
        const customer = {
            firstName : this.registerForm.value.firstName,
            lastName : this.registerForm.value.lastName,
            email : this.registerForm.value.email,
            title : this.registerForm.value.title,
            password : this.registerForm.value.password,
            confirmPassword : this.registerForm.value.confirmPassword,
            acceptTerms : this.registerForm.value.acceptTerms,
        };
        this.store.dispatch(new CustomerActions.PostCustomer(customer));
    }
    writeUpdatedDataToStore() {
        this.store.dispatch(new CustomerActions.CustomerAdd(this.customerCollections));
    }
    readUpdatedDataFromStore() {
        this.store.select('customers').subscribe(
            res => {
                if(res) {
                    this.customerDataStore = res;
                }
            });
        console.log('readUpdatedDataFromStore customerDataStore  => ', this.customerDataStore);
    }
}
