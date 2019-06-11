import { Injectable } from '@angular/core';
import { CityComponent } from '../components/dashboard/city/city.component';
@Injectable({
  providedIn: 'root'
})
export class DashboardUpdateService {

  public label = 'Nenhum';
  public city;
  public crime;

  public colorArray = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ];

  public teste: CityComponent

  constructor() { }

  public setCity(city, crime) {
    this.city = city;
    this.crime = crime;

    this.teste.setCity(city, crime);
  }

  public makeSortString = (function () {
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
