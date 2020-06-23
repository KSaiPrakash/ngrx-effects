import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { HttpClient } from '@angular/common/http';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private localAPIUrl = 'assets/json/customer.json';
  //private event: AngularFireList<any[]>;
  customersRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  customerRef: AngularFireObject<Customer>;

  constructor(private http: HttpClient, private firestore: AngularFirestore ) {}


  getDataFromId(id: string): Observable<any> {
    // mock data Observable mapped from the passed id
    // delayed of 1000 ms
    return of({ id: 0, data: '' }).pipe(
      map(item => ({ id, data: 'Expanded data from id: ' + id })),
      delay(1000)
    )
  }

  getCustomer(): Observable<any>  {
      console.log('service called')
      //this.items = this.db.list('/events');
      return this.http.get(this.localAPIUrl);

  }
  postCustomer(customer: Customer): Observable<any> {
    console.log('post ervice called')
    // return this.http.get(this.localAPIUrl);
    // this.customersRef.push({
    //   firstName: customer.firstName,
    //   lastName: customer.lastName,
    //   email: customer.email,
    //   password: customer.password,
    //   confirmPassword: customer.confirmPassword,
    //   acceptTerms: customer.acceptTerms,
    //   title: customer.title
    // });

  //   return new Promise<any>((resolve, reject) =>{
  //     this.firestore
  //         .collection('customers')
  //         .add(customer)
  //         .then(res => {
  //           console.log('post cust reponse => ',res);
  //         }, err => reject(err));
  // });

    // return of((resolve, reject) =>{
    //     this.firestore
    //         .collection('customers')
    //         .add(customer)
    //         .then(res => {
    //           console.log('post cust reponse => ', res);
    //         }, err => reject(err));
    // });
}

}
