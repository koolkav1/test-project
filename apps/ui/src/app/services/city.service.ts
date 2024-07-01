import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../interfaces/city.model';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:3000/api/text';

  constructor(private http: HttpClient) { }

  getCities(page: number = 1, pageSize: number = 10, search: string = '', filter: string = ''): Observable<{ data: string[], total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.http.get<{ data: string[], total: number }>(this.apiUrl, { params });

  }
}
