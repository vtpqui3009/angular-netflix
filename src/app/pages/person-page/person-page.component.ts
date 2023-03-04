import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/model/person';
import { PERSON_MOCK_DATA } from 'src/app/shared/mock/mock-data';
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
