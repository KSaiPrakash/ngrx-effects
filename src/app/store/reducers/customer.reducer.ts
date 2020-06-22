import {ActionEx, CustomerActionTypes} from './../actions/customer.action';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { Customer } from './../../models/customer.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface CustomerState extends EntityState<Customer> {
  loading: boolean; // indicates loading while fetching data
  selectedCustomerId: number | null;
 }
const customerAdapter = createEntityAdapter<Customer>({
  selectId: (customer: Customer) => customer.firstName
});

const customerInitialState: CustomerState = customerAdapter.getInitialState({
  loading: false,
  selectedCustomerId: null
});

export function CustomerReducer(state: CustomerState = customerInitialState, action: ActionEx) {
  switch (action.type) {
    case CustomerActionTypes.Customer_Get_Success:
      return customerAdapter.setAll(action.payload, state);
    case CustomerActionTypes.Customer_Add:
      return customerAdapter.addOne(action.payload, state);
    case CustomerActionTypes.Customer_Remove:
      return customerAdapter.removeOne(action.payload, state);
    case CustomerActionTypes.Customer_Post_Success:
      return customerAdapter.addOne(action.payload, state);
    default:
      return state;
  }
}

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const { selectAll: selectAllCustomers, selectIds } = customerAdapter.getSelectors(
  selectCustomerState
);

export const getSelectedCustomer = createSelector(
  selectCustomerState,
  (state) => {
    return state.entities[state.selectedCustomerId];
  }
)