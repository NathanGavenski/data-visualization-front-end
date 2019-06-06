import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CrimeLoader } from '../common/crimeLoader.component';
import { CityComponent } from './city/city.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(CityComponent)
  private cityComponent: CityComponent;

  @Input() map: MapComponent

  private crimeJson;
  public state = true;
  public cityInfo;
  public cityNames;
  public local: string;
  public clustersType = ['Normal', 'IBGE', 'Crime', 'IBGE + Crime']
  public test = false;

  constructor() {
    this.crimeJson = new CrimeLoader().getJson()
    this.clicked_rs()
  }

  ngOnInit() {
    this.cityNames = Object.keys(this.crimeJson);
    this.cityNames = this.cityNames.map((word) => {
      return this.capitalizeFirstLetter(word);
    });
  }

  capitalizeFirstLetter(string) {
    let list = string.split(' ')
    list = list.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return list.join(' ');
  }

  clicked_city(city) {
    this.state = false;
    this.local = this.capitalizeFirstLetter(city)

    const crimeInfo = this.crimeJson[city.toUpperCase()]['2018'];
    let info = this.crimeJson[city.toUpperCase()]['IBGE'];
    if (info) {
      this.cityInfo = JSON.stringify(info);
      this.cityComponent.setCity(this.cityInfo);
    } else this.cityComponent.setCity(null);
  }

  getLocal() {
    return this.local;
  }

  clicked_rs() {
    this.state = true;
    this.local = "Rio Grande do Sul"
  }

  activate_clusters(type) {
    if (type === 'Normal') this.map.createNormalMap();
    else if (type === 'IBGE') this.map.createIBGEMap();
    else if (type === 'Crime') this.map.createCrimeMap();
    else if (type === 'IBGE + Crime') this.map.createIBGECrimeMap();
  }

  teste() {
    console.log(this.test)
    this.test = !this.test;
  }

}
