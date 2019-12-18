import {Injectable, OnDestroy} from '@angular/core';
import {ApiService} from './api.service';
import {merge, Observable, Subject} from 'rxjs';
import {debounce, debounceTime, map, takeUntil} from 'rxjs/operators';
import {Medicine} from '../models/medicine.model';
import {AnalogsService} from './analogs.service';
import {CustomersService} from './customers.service';
import {tap} from 'rxjs/internal/operators/tap';
import {InfoHelper} from '../helpers/info.helper';

@Injectable({
    providedIn: 'root'
})
export class SearchService implements OnDestroy {

    private stop$ = new Subject();

    constructor(
        private api: ApiService,
        private analogs: AnalogsService,
        private customers: CustomersService
    ) {
    }

    ngOnDestroy(): void {
        this.stop$.next();
        this.stop$.complete();
    }

    getData<T, R extends InfoHelper<Medicine[]>>(method, context: R, data: T) {
        method(data)
            .pipe(
                takeUntil(this.stop$),
                tap(
                    context.startLoader
                ),
                map((r: object[]) => r.map(s => new Medicine(s)))
            )
            .subscribe((res: Medicine[]) => {
                context.refreshInfo$.next(res);
                context.stopLoader();
            });
    }

    getMainInfoByMedicine(model: Medicine) {
        this.stop$.next();
        this.getData(this.api.getAllCustomers.bind(this.api), this.customers, model.mainName);
        this.getData(this.api.getAnalogs.bind(this.api), this.analogs, model._id);
    }

    search(str: string): Observable<Medicine[]> {
        return this.api.getMed(str)
            .pipe(
                map((meds: object[]) => meds.map(med => new Medicine(med)))
            );
    }
}
