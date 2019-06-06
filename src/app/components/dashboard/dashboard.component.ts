import { Component, OnInit, ViewChild } from '@angular/core';
import { CrimeLoader } from '../common/crimeLoader.component';
import { CityComponent } from './city/city.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(CityComponent)
  private cityComponent: CityComponent;

  private crimeJson;
  public state = true;
  public cityInfo;
  public cityNames;
  public local: string;

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

  activate_clusters() {
    window.alert('Oi')
  }

}
