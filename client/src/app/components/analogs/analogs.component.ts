import { Component, OnInit } from '@angular/core';
import {AnalogsService} from '../../services/analogs.service';
import {Medicine} from '../../models/medicine.model';

@Component({
  selector: 'app-analogs',
  templateUrl: './analogs.component.html',
  styleUrls: ['./analogs.component.sass']
})
export class AnalogsComponent {

  constructor(
      public analogs: AnalogsService
  ) { }
}
