import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {mergeMap} from "rxjs/internal/operators/mergeMap";
import {Observable, Subject} from 'rxjs';
import {Medicine} from "../../models/medicine.model";
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {switchMap} from "rxjs/internal/operators/switchMap";
import {filter} from "rxjs/internal/operators/filter";
import {tap} from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  medicines: Observable<Medicine[]>;
  loader = false;
  search$ = new Subject<string>();
  stop$ = new Subject();

  constructor(
      private search: SearchService,
      private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.startSubscriber();
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  displayFn(medicine?: Medicine): string | undefined {
    return medicine ? medicine.mainName : undefined;
  }

  generateReport(model: Medicine) {
    this.search.getMainInfoByMedicine(model);
  }

  startSearch(str: string) {
    if (str.includes('(') && !str.includes(')')) str += ')';
    this.search$.next(str);
  }

  private startLoader() {
    this.loader = true;
  }

  private startSubscriber() {
    this.search$
        .pipe(
            debounceTime(100),
            takeUntil(this.stop$),
            filter(s => !!s && s.length >= 3),
            tap(this.startLoader.bind(this)),
            distinctUntilChanged(),
        )
        .subscribe(r => {
         this.medicines = this.search.search(r)
              .pipe(
                  tap(this.stopLoader.bind(this))
              );
        });
  }

  private stopLoader() {
    this.loader = false;
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      search: new FormControl('')
    });
  }
}
