import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as CustomerActions from './../actions/customer.action';
import {Customer} from './../../models/customer.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { CustomerActionTypes } from './../actions/customer.action';

@Injectable()
export class CustomerEffects {
  constructor(private action$: Actions, private customerService: CustomerService) {}

  // private ApiURL: string = 'https://localhost:44308/api/ToDo';
  loadCustomer$: Observable<Action> =
  // createEffect(() =>
  this.action$.pipe(
    ofType(CustomerActionTypes.Customer_Get),
    // mergeMap(() => this.customerService.getCustomer()
    //   .pipe(
    //     map((customers: Customer[]) => new CustomerActionTypes.Customer_Get_Success(customers)),
    //     catchError(err => of(new CustomerActionTypes.Customer_Get_Failure(err)))
    //   ))
    );
  //);


  @Effect()
  loadCustomers$: Observable<Action> = this.action$.pipe(
    ofType<CustomerActions.GetCustomer>(
      CustomerActionTypes.Customer_Get
    ),
    mergeMap((action: CustomerActions.GetCustomer) =>
      this.customerService.getCustomer().pipe(
        map(
          (customers: Customer[]) =>
            new CustomerActions.GetCustomerSuccess(customers)
        ),
        catchError(err => of(new CustomerActions.GetCustomerFailure(err)))
      )
    )
  );

}