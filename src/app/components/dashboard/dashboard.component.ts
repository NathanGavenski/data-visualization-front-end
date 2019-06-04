import { Component, OnInit } from '@angular/core';
import { CrimeLoader } from '../common/crimeLoader.component';
//import {Cidade} from './cidade.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private crimeJson;
  public state = true;
  public cityInfo; 

  local: string;
  estimated_population: number
  census_population: number;
  demographic_density: number;
  total_vehicles: number;

  elementary_enrollment: number;
  high_enrollment: number;
  elementary_teachers: number;
  high_teachers: number;
  fundamental_schools: number;
  high_schools: number;

  per_capita_income: number;
  busy_people_16: number;
  formal_people_16: number;
  formal_people_14: number;
  average_yield_14: number;
  public_initiative_workers: number;

  idh: number;
  agencies: number;
  deposited: number;

  area: number;

  constructor() {
    this.crimeJson = new CrimeLoader().getJson()
    this.clicked_rs()
  }

  ngOnInit() {

  }

  clicked_city(city) {
    this.state = false;
    this.local = "Porto Alegre";

    const crimeInfo = this.crimeJson[city.toUpperCase()]['2018'];
    let info = this.crimeJson[city.toUpperCase()]['IBGE'];
    this.cityInfo = JSON.stringify(info);

  }

  clicked_rs() {
    this.state = true;
    this.local = "Rio Grande do Sul"
  }

}
