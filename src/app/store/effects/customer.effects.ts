import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as CustomerActions from './../actions/customer.action';
import {Customer, Customers} from './../../models/customer.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { CustomerActionTypes } from './../actions/customer.action';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class CustomerEffects {
  constructor(private action$: Actions, private customerService: CustomerService) {}

  /*
  @Effect()
  loadCustomers$: Observable<Action> = this.action$.pipe(
    ofType<CustomerActions.GetCustomer>(
      CustomerActionTypes.Customer_Get
    ),
    mergeMap((action: CustomerActions.GetCustomer) =>
      this.customerService.getCustomer().pipe(
        map(
          (customers: Customers[]) =>
            {
              return new CustomerActions.GetCustomerSuccess(customers);
            }
        ),
        catchError(err => of(new CustomerActions.GetCustomerFailure(err)))
      )
    )
  );
  @Effect()
  getPost$: Observable<Action> = this.action$.pipe(
    ofType<CustomerActions.PostCustomer>(
      CustomerActionTypes.Customer_Post
    ),
    mergeMap((action: CustomerActions.PostCustomer) => 
      this.customerService.postCustomer(action.payload).pipe(
        map(
          (customers: Customers[]) =>
            {
              return new CustomerActions.PostCustomerSuccess(customers);
            }
        ),
        catchError(err => of(new CustomerActions.PostCustomerFailure(err)))
      )
    )
  );
*/
}
