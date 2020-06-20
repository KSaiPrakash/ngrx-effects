
import {Action} from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
export enum CustomerActionTypes {
  Customer_Add = '[Customer Component] Add',
  Customer_Remove = '[Customer Component] Remove',
  Customer_Get = '[Customer Component] Load Customers',
  Customer_Get_Success = '[Customer Component] Customer Get Success',
  Customer_Get_Failure = '[Customer Component] Customer Get Failure'
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}

export class LoadAction implements Action {
  readonly type;
}
export class CustomerAdd implements ActionEx {
  readonly type = CustomerActionTypes.Customer_Add;
  constructor(public payload: any) {
  }
}
export class CustomerRemove implements ActionEx {
  readonly type = CustomerActionTypes.Customer_Remove;
  constructor(public payload: any) {
  }
}

/** Get Customer */
export class GetCustomerSuccess implements ActionEx {
  readonly type = CustomerActionTypes.Customer_Get_Success;
  constructor(public payload: any) {
  }
}
export class GetCustomerFailure implements ActionEx {
  readonly type = CustomerActionTypes.Customer_Get_Failure;
  constructor(public payload: any) {
}
}
export class GetCustomer implements LoadAction {
  readonly type = CustomerActionTypes.Customer_Get;
  constructor() {
  }
  
}
