import {BehaviorSubject, Subject} from 'rxjs';

export abstract class InfoHelper<T> {
    loader = false;
    refreshInfo$ = new Subject<T>();
    getData = this.refreshInfo$.asObservable();

    startLoader() {
        this.loader = true;
    }

    stopLoader() {
        this.loader = false;
    }
}
