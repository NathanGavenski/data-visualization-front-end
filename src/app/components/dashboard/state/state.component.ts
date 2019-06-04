import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  public estimated_population: number
  public census_population: number;
  public demographic_density: number;
  public total_vehicles: number;

  public elementary_enrollment: number;
  public high_enrollment: number;
  public elementary_teachers: number;
  public high_teachers: number;
  public fundamental_schools: number;
  public high_schools: number;

  public per_capita_income: number;
  public busy_people_16: number;
  public formal_people_16: number;
  public formal_people_14: number;
  public average_yield_14: number;
  public public_initiative_workers: number;

  public idh: number;
  public agencies: number;
  public deposited: number;

  public area: number;

  constructor() { }

  ngOnInit() {
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

    this.idh = 0.746;
    this.agencies = 1743;
    this.deposited = 61895932033.00;

    this.area = 281707.151;

    this.per_capita_income = 1705.00;
    this.busy_people_16 = 5842;
    this.formal_people_16 = 67.6;
    this.formal_people_14 = 70.2;
    this.average_yield_14 = 2524;
    this.public_initiative_workers = 34636;
  }

}
