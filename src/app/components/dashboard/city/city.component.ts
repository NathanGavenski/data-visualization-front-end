import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input('cityInfo') cityInfo;

  public estimated_population: number
  public census_population: number;
  public demographic_density: number;
  public total_vehicles: number;

  public school_minor: number;
  public IDEB
  public elementary_enrollment: number;
  public high_enrollment: number;
  public elementary_teachers: number;
  public high_teachers: number;
  public fundamental_schools: number;
  public high_schools: number;

  public per_capita_income: number;
  public occupied_people: number;
  public occupied_population: number;
  public average_salary: number;
  public percentual_rendimento: number;

  public infant_death: number;
  public diarreia: number;
  public sus: number;

  public PIB: number;
  public receitas_fontes_externas: number;
  public idh: number;

  public area: number;
  public sanitario: number;
  public arborizacao: number;
  public urbanizacao: number;

  constructor() {
  }

  ngOnInit() {
    this.cityInfo = JSON.parse(this.cityInfo)
    this.estimated_population = this.cityInfo.estimated_population;
    this.census_population = this.cityInfo.population_last_census;
    this.demographic_density = this.cityInfo.demographic_density;

    this.school_minor = this.cityInfo.school_minor;
    this.IDEB = this.cityInfo.IDEB
    this.elementary_enrollment = this.cityInfo['Matrículas no ensino fundamental'];
    this.high_enrollment = this.cityInfo['Matrículas no ensino médio'];
    this.elementary_teachers = this.cityInfo.fundamental_teachers;
    this.high_teachers = this.cityInfo.medium_teachers;
    this.fundamental_schools = this.cityInfo.fundamental_schools;
    this.high_schools = this.cityInfo.medium_schools;

    this.PIB = this.cityInfo.PIB;
    this.receitas_fontes_externas = this.cityInfo.receitas_fontes_externas;
    this.idh = this.cityInfo.IDHM;

    this.infant_death = this.cityInfo.infant_death;
    this.diarreia = this.cityInfo.diarrhea_hospitalizations;
    this.sus = this.cityInfo.estabelecimento_sus


    this.area = this.cityInfo['Área da unidade territorial'];
    this.sanitario = this.cityInfo["Esgotamento sanitário adequado"];
    this.arborizacao = this.cityInfo["Arborização de vias públicas"];
    this.urbanizacao = this.cityInfo["Urbanização de vias públicas"];

    this.per_capita_income = this.cityInfo['Half income'];
    this.occupied_people = this.cityInfo.occupied_people;
    this.occupied_population = this.cityInfo.occupied_population;
    this.average_salary = this.cityInfo.average_salary;
    this.percentual_rendimento = this.cityInfo['Half income'];
  }

}
