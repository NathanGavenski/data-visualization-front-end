import { Component, OnInit } from '@angular/core';
//import {Cidade} from './cidade.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  local:string;
  estimated_population:number
  census_population:number;
  demographic_density:number;
  total_vehicles:number;

  elementary_enrollment:number;
  high_enrollment:number;
  elementary_teachers:number;
  high_teachers:number;
  fundamental_schools:number;
  high_schools:number;

  per_capita_income:number;
  busy_people_16:number;
  formal_people_16:number;
  formal_people_14:number;
  average_yield_14:number;
  public_initiative_workers:number;

  constructor() { }

  ngOnInit() {
    
  }

  clicked_city() {

    this.local = "da cidade de Porto Alegre";

    this.estimated_population = 2;
    this.census_population = 2;
    this.demographic_density = 2;
    this.total_vehicles = 2;

    this.elementary_enrollment = 3;
    this.high_enrollment = 3;
    this.elementary_teachers = 3;
    this.high_teachers = 3;
    this.fundamental_schools = 3;
    this.high_schools = 3;

    this.per_capita_income = 4;
    this.busy_people_16 = 4;
    this.formal_people_16 = 4;
    this.formal_people_14 = 4;
    this.average_yield_14 = 4;
    this.public_initiative_workers = 4;

  }

  clicked_rs() {
    this.local = "do estado do Rio Grande do Sul";

    this.estimated_population = 11329605;
    this.census_population = 10693929;
    this.demographic_density = 37.96;
    this.total_vehicles = 6650259;

    this.elementary_enrollment = 1298736;
    this.high_enrollment = 338065;
    this.elementary_teachers = 73770;
    this.high_teachers = 27771;
    this.fundamental_schools = 5926;
    this.high_schools = 1503;

    this.per_capita_income = 1705.00;
    this.busy_people_16 = 5842;
    this.formal_people_16 = 67.6;
    this.formal_people_14 = 70.2;
    this.average_yield_14 = 2524;
    this.public_initiative_workers = 34636;
  }

}
