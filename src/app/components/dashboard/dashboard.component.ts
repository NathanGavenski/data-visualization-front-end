import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CrimeLoader } from '../common/crimeLoader.component';
import { CityComponent } from './city/city.component';
import { DashboardUpdateService } from 'src/app/services/dashboard-update.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private crimeJson;

  public clusterLabel = 'Mostrar clusters'
  public clustersType = ['Nenhum', 'IBGE', 'Crime', 'IBGE + Crime']

  public selectedType;
  public cityInfo;
  public cityNames;
  public cityLabel = 'Escolher cidades';

  public currentCluster = this.clustersType[0];
  public state = true;
  public local: string;
  public test = false;

  @ViewChild(CityComponent)
  private cityComponent: CityComponent;

  @Input()  city: String;
  @Output() createMap = new EventEmitter();
  @Output() showDistance = new EventEmitter();
  @Output() unsetDistance = new EventEmitter();

  constructor(private service: DashboardUpdateService) {
    this.crimeJson = new CrimeLoader().getJson()
  }

  ngOnInit() {
    this.cityNames = Object.keys(this.crimeJson);
    this.cityNames = this.cityNames.map((word) => {
      return this.capitalizeFirstLetter(word);
    });
    
    if (this.city) this.clicked_city(this.city);
    else this.clicked_rs();
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
    this.cityLabel = this.local;

    city = this.makeSortString(city)
    if (city === 'FAZENDA VILANOVA') city = 'FAZENDA VILA NOVA'
    if (city === 'ENTRE-IJUIS') city = 'ENTRE IJUIS'

    const crimeInfo = this.crimeJson[city.toUpperCase()]['2018'];
    let info = this.crimeJson[city.toUpperCase()]['IBGE'];
    
    if (info && crimeInfo) {
      this.service.setCity(info, crimeInfo);
    }
  }

  clicked_rs() {
    this.state = true;
    this.local = "Rio Grande do Sul"
    this.cityLabel = 'Escolher cidades';
  }

  activate_clusters(type) {
    if (type === 'Nenhum') this.clusterLabel = 'Mostrar clusters';
    else this.clusterLabel = type;

    this.service.label = type;
    this.currentCluster = type;
    this.createMap.emit({ kind: type })
  }

  getLocal() {
    return this.local;
  }
  
  distance(event) {
    this.showDistance.emit({
      kind: this.currentCluster,
      city: this.local
    });
  }

  removeDistance(event) {
    this.unsetDistance.emit({
      kind: this.currentCluster,
      city: this.local
    });
  }

  private makeSortString = (function () {
    var translate_re = /[ÄÃÁÂÁÇÖÓÕÔÔÊÉÍÚÜ]/g;
    var translate = {
      "Ä": "A", "Ö": "O", "Ü": "U",
      "Ã": "A", "Õ": "O", "É": "E",
      "Ó": "O", "Ç": "C", "Ê": "E",
      "Â": "A", "Í": "I", "Á": "A",
      "Ô": "O", "Ú": "U"  // probably more to come
    };
    return function (s) {
      return (s.replace(translate_re, function (match) {
        return translate[match];
      }));
    }
  })();

}
