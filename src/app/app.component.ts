import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  startWith,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public countryList: Observable<any> = null;
  public stateList: Observable<any> = null;
  public cityList: Observable<any> = null;

  public country = new FormControl();
  public stateName = new FormControl();
  public cityName = new FormControl();

  public isState = false;
  public isCity = false;
  constructor(private commonService: CommonService) {}

  lookup(value, id , type): Observable<any> {
    return this.commonService.search(value.toLowerCase(), id , type).pipe(
      map(results => results)
    );
  }

  getStateList(id) {
   this.isState = true;
   this.stateList = this.stateName.valueChanges.pipe(
     startWith(''),
     switchMap(value => {
       if (value !== '') {
         return this.lookup(value, id, 'acState');
       } else {
         return of(null);
       }
     })

   );
  }

  getCityList(id){
    this.isCity = true ;
    this.cityList = this.cityName.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value, id, 'acCity');
        } else {
          return of(null);
        }
      })

    );
  }

  ngOnInit() {
    this.countryList = this.country.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value, null, 'acCountry');
        } else {
          return of(null);
        }
      })
    );
  }
}
