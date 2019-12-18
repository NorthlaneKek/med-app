import { Component, OnInit } from '@angular/core';
import {CustomersService} from '../../services/customers.service';
import {Medicine} from '../../models/medicine.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.sass']
})
export class CustomersComponent {
  constructor(
      public customers: CustomersService
  ) { }
}
