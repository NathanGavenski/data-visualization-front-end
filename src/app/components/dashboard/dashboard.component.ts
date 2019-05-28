import { Component, OnInit } from '@angular/core';
import { core } from '@angular/compiler';
import { CrimeLoader } from '../common/crimeLoader.component';
//import {Cidade} from './cidade.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private crimeJson;

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
    const crimeInfo = this.crimeJson[city.toUpperCase()]['2018'];
    const cityInfo = this.crimeJson[city.toUpperCase()]['IBGE']

    console.log(cityInfo)

    this.local = "da cidade de Porto Alegre";

    this.estimated_population = cityInfo.estimated_population;
    this.census_population = cityInfo.population_last_census;
    this.demographic_density = cityInfo.demographic_density;
    this.total_vehicles = 0;

    this.elementary_enrollment = cityInfo['Matrículas no ensino fundamental'];
    this.high_enrollment = cityInfo['Matrículas no ensino médio'];
    this.elementary_teachers = cityInfo.fundamental_teachers;
    this.high_teachers = cityInfo.medium_teachers;
    this.fundamental_schools = cityInfo.fundamental_schools;
    this.high_schools = cityInfo.medium_schools;

    this.idh = cityInfo.IDHM;
    this.agencies = 0;
    this.deposited = 0;

    this.area = cityInfo['Área da unidade territorial'];

    this.per_capita_income = cityInfo['Half income'];
    this.busy_people_16 = cityInfo['occupied_people'];
    this.formal_people_16 = cityInfo['occupied_population'];
    this.formal_people_14 = 0;
    this.average_yield_14 = 0;
    this.public_initiative_workers = 0;
  }

  clicked_rs() {
    this.local = "do Rio Grande do Sul";

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
