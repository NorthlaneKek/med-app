import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAnalogs(id: string): Observable<object>  {
        const params = new HttpParams().set('_id', id);
        return this.http.get('http://localhost:8080/getAnalogs', {params});
    }

    getAllCustomers(name: string): Observable<object>  {
        const params = new HttpParams().set('name', name);
        return this.http.get('http://localhost:8080/getAllCustomers', {params});
    }

    getMed(str: string){
        const params = new HttpParams().set('text', str);
        return this.http.get('http://localhost:8080/getMeds', {params});
    }
}
