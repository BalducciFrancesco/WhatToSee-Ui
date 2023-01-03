import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../dtos/tour';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  // public getAutocompletes(query: string): Observable<City[]> {
  //   const params = new HttpParams().append('query', query)
  //   return this.http.get<City[]>(environment.apiUrl + '/autocompleteCity', { params })
  // }

  public getAll(): Observable<City[]> {
    return this.http.get<City[]>(environment.apiUrl + '/city')
  }

}
