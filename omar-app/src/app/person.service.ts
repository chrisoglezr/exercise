import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPeopleRecords(page, perpage) {
    return this.http.get<any>(`http://localhost:5000/api/people/records/perpage/${perpage}/page/${page}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getFrequencyCharacterCounter(page, perpage) {
    return this.http.get<any>(`http://localhost:5000/api/people/email/characters/frequency/perpage/${perpage}/page/${page}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // Error handling
  errorHandler(error: any) {
    let errorMessage = "";
    if (error && error.error && error.error.status) {
      errorMessage = `Error Code: ${error.error.status}\nMessage:${error.error.message}`;
    } else {
      errorMessage = error;
    }
    return throwError(errorMessage);
  }
}
