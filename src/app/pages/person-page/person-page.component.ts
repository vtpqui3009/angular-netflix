import { PERSON_MOCK_DATA } from './../../shared/mock/mock-data';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss'],
})
export class PersonPageComponent implements OnInit {
  persons: Person[] = [];
  ngOnInit() {
    this.persons = PERSON_MOCK_DATA;
  }
}
