import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DashboardUpdateService } from 'src/app/services/dashboard-update.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  @Output() callDistance = new EventEmitter();
  @Output() removeDistance = new EventEmitter();
  
  public selectedType;

  public estimated_population: String
  public census_population: String;
  public demographic_density: String;
  public total_vehicles: String;

  public school_minor: String;
  public IDEB
  public elementary_enrollment: String;
  public high_enrollment: String;
  public elementary_teachers: String;
  public high_teachers: String;
  public fundamental_schools: String;
  public high_schools: String;

  public per_capita_income: String;
  public occupied_people: String;
  public occupied_population: String;
  public average_salary: String;
  public percentual_rendimento: String;

  public infant_death: String;
  public diarreia: String;
  public sus: String;

  public PIB: String;
  public receitas_fontes_externas: String;
  public idh: String;

  public area: String;
  public sanitario: String;
  public arborizacao: String;
  public urbanizacao: String;

  private cityInfo;

  constructor(private service: DashboardUpdateService) {
    this.selectedType = this.service;
  }

  ngOnInit() {
    this.setCity(this.service.city);
  }

  setCity(city) {
    if (city) {
      this.cityInfo = JSON.parse(city);
    } else this.cityInfo = {};
    
    this.estimated_population = (this.cityInfo.estimated_population) ? this.cityInfo.estimated_population : 'NaN'; 
    this.census_population = (this.cityInfo.population_last_census) ? this.cityInfo.population_last_census : 'NaN';
    this.demographic_density = (this.cityInfo.demographic_density) ? this.cityInfo.demographic_density : 'NaN';

    this.school_minor = (this.cityInfo.school_minor) ? this.cityInfo.school_minor : 'NaN';
    this.IDEB = (this.cityInfo.IDE) ? this.cityInfo.IDE : 'NaN';
    this.elementary_enrollment = (this.cityInfo['Matrículas no ensino fundamental']) ? this.cityInfo['Matrículas no ensino fundamental'] : 'NaN';
    this.high_enrollment = (this.cityInfo['Matrículas no ensino médio']) ? this.cityInfo['Matrículas no ensino médio'] : 'NaN';
    this.elementary_teachers = (this.cityInfo.fundamental_teachers) ? this.cityInfo.fundamental_teachers : 'NaN';
    this.high_teachers = (this.cityInfo.medium_teachers) ? this.cityInfo.medium_teachers : 'NaN';
    this.fundamental_schools = (this.cityInfo.fundamental_schools) ? this.cityInfo.fundamental_schools : 'NaN';
    this.high_schools = (this.cityInfo.medium_schools) ? this.cityInfo.medium_schools : 'NaN';

    this.PIB = (this.cityInfo.PIB) ? this.cityInfo.PIB : 'NaN';
    this.receitas_fontes_externas = (this.cityInfo.receitas_fontes_externas) ? this.cityInfo.receitas_fontes_externas : 'NaN';
    this.idh = (this.cityInfo.IDHM) ? this.cityInfo.IDHM : 'NaN';

    this.infant_death = (this.cityInfo.infant_death) ? this.cityInfo.infant_death : 'NaN';
    this.diarreia = (this.cityInfo.diarrhea_hospitalizations) ? this.cityInfo.diarrhea_hospitalizations : 'NaN';
    this.sus = (this.cityInfo.estabelecimento_sus) ? this.cityInfo.estabelecimento_sus : 'NaN'

    this.area = (this.cityInfo['Área da unidade territorial']) ? this.cityInfo['Área da unidade territorial'] : 'NaN';
    this.sanitario = this.cityInfo["Esgotamento sanitário adequado"] ? this.cityInfo["Esgotamento sanitário adequado"] : 'NaN';
    this.arborizacao = this.cityInfo["Arborização de vias públicas"] ? this.cityInfo["Arborização de vias públicas"] : 'NaN';
    this.urbanizacao = this.cityInfo["Urbanização de vias públicas"] ? this.cityInfo["Urbanização de vias públicas"] : 'NaN';

    this.per_capita_income = this.cityInfo['Half income'] ? this.cityInfo['Half income'] : 'NaN';
    this.occupied_people = this.cityInfo.occupied_people ? this.cityInfo.occupied_people : 'NaN';
    this.occupied_population = this.cityInfo.occupied_population ? this.cityInfo.occupied_population : 'NaN';
    this.average_salary = this.cityInfo.average_salary ? this.cityInfo.average_salary : 'NaN';
    this.percentual_rendimento = this.cityInfo['Half income'] ? this.cityInfo['Half income'] : 'NaN';
  }

  activateDistance() {
    this.callDistance.emit();
  }

  deactivateDistance() {
    this.removeDistance.emit();
  }

}
