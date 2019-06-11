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

  public estimated_population: String;
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

  public weapons_delicts: String;
  public narcotics_possetion: String;
  public narcotics_trafic: String;
  public stelionate: String;
  public thefts: String;
  public willful_homicide: String;
  public robberys: String;
    
  public vehicle_thefts: String;
  public steals: String;
  public vehicles: String;
  public slaughter: String;
  public victims_willful: String;
    

  public cityInfo;
  public crimeInfo;

  constructor(private service: DashboardUpdateService) {
    this.selectedType = this.service;
    this.service.teste = this;
  }

  ngOnInit() {
    this.setCity(this.service.city, this.service.crime);
  }

  setCity(city, crime) {    
    if (city) {
      this.cityInfo = city;
    } else this.cityInfo = {}

    this.estimated_population = (this.cityInfo.estimated_population) ? this.cityInfo.estimated_population : 'NaN'; 
    this.census_population = (this.cityInfo.population_last_census) ? this.cityInfo.population_last_census : 'NaN';
    this.demographic_density = (this.cityInfo.demographic_density) ? this.cityInfo.demographic_density : 'NaN';

    this.school_minor = (this.cityInfo.school_minor) ? this.cityInfo.school_minor : 'NaN';
    this.IDEB = (this.cityInfo.IDEB) ? this.cityInfo.IDEB : 'NaN';
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

    if (crime) {
      this.crimeInfo = crime;
    } else this.crimeInfo = {}

    this.weapons_delicts = this.crimeInfo[' Delitos Relacionados à Armas e Munições'] ? this.crimeInfo[' Delitos Relacionados à Armas e Munições'] : 'NaN';
    this.narcotics_possetion = this.crimeInfo[' Entorpecentes - Posse'] ? this.crimeInfo[' Entorpecentes - Posse'] : 'NaN';
    this.narcotics_trafic = this.crimeInfo[' Entorpecentes - Tráfico'] ? this.crimeInfo[' Entorpecentes - Tráfico'] : 'NaN';
    this.stelionate = this.crimeInfo[' Estelionato'] ? this.crimeInfo[' Estelionato'] : 'NaN';
    this.thefts = this.crimeInfo[' Furtos'] ? this.crimeInfo[' Furtos'] : 'NaN';
    this.willful_homicide = this.crimeInfo[' Homicídio  Doloso'] ? this.crimeInfo[' Homicídio  Doloso'] : 'NaN';
    this.robberys = this.crimeInfo[' Latrocínio'] ? this.crimeInfo[' Latrocínio'] : 'NaN';
    
    this.vehicle_thefts = this.crimeInfo[' Roubo de Veículo'] ? this.crimeInfo[' Roubo de Veículo'] : 'NaN';
    this.steals = this.crimeInfo[' Roubos'] ? this.crimeInfo[' Roubos'] : 'NaN';
    this.vehicles = this.crimeInfo[' Veículo'] ? this.crimeInfo[' Veículo'] : 'NaN';
    this.slaughter = this.crimeInfo['Abigeato*'] ? this.crimeInfo['Abigeato*'] : 'NaN';
    this.victims_willful = this.crimeInfo['Total de vítimas de Homicidio Doloso'] ? this.crimeInfo['Total de vítimas de Homicidio Doloso'] : 'NaN';
    

    console.log(this.crimeInfo);
  }

  activateDistance() {
    this.callDistance.emit();
  }

  deactivateDistance() {
    this.removeDistance.emit();
  }

}
