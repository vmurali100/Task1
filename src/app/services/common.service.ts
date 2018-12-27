import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {}
  url;
  search(query, id, value): Observable<any> {
    console.log(query);
    if (id === undefined || id === null) {
      this.url = 'http://196.29.169.131:8080/api/Ddl/' + value + '/' + query + '/true';

    } else {
      this.url = 'http://196.29.169.131:8080/api/Ddl/' + value + '/' + query + '/' + id + '/true';
    }
    return this.http
      .get<any>(this.url)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
