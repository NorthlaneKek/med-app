import { Injectable } from '@angular/core';
import {InfoHelper} from '../helpers/info.helper';
import {Medicine} from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends InfoHelper<Medicine[]> {

}
