import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  constructor(private http: HttpClient, private firestore: AngularFirestore ) {}


  getDataFromId(id: string): Observable<any> {
    // mock data Observable mapped from the passed id
    // delayed of 1000 ms
    return of({ id: 0, data: '' }).pipe(
      map(item => ({ id, data: 'Expanded data from id: ' + id })),
      delay(1000)
    )
  }

  postCustomer(customer: Customer): Observable<Customer> {
    return new Observable<Customer>(() => {
      this.firestore.collection('customers').add(customer);
    });
  }
  getCustomers(): Observable<Customer> {
    // return new Observable<any>(() => {
    //   this.firestore.collection('/customers').snapshotChanges()
    //   .subscribe(snapshots => {
    //     // resolve(snapshots);
    //     console.log('snapshots ', snapshots);
    //   });
    // });
    return new Observable<any>(() =>{
      this.firestore.collection<Customer>('customers').get()
      .subscribe(response => {
        console.log(response);
      })
    });
  }
}
