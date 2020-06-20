import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  private localAPIUrl: string = 'assets/json/customer.json';

  constructor(private http: HttpClient) {}


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
      return this.http.get(this.localAPIUrl);

  }

}