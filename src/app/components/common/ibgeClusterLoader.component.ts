import * as $ from 'jquery';
import { DashboardUpdateService } from 'src/app/services/dashboard-update.service';

export class IBGEClusterLoader {

    public json;

    constructor () {
        this.json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "./assets/clustering_ibge_data.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })();
    }

    public getJson() {
        return this.json;
    }

    public getDistanceFrom = (city: string) => {
        city = this.makeSortString(city.toUpperCase())
        if (city === 'FAZENDA VILANOVA') city = 'FAZENDA VILA NOVA'
        if (city === 'ENTRE-IJUIS') city = 'ENTRE IJUIS'
        const point = this.json[city]
        const distances = [];

        for (let key in this.json) {
            let element = this.json[key];
            const distance = this.calculateDistance(point.x, point.y, element.x, element.y);
            element.distance = distance;
            distances.push(distance);
        }

        const min = Math.min.apply(null, distances);
        const max = Math.max.apply(null, distances);

        for (let key in this.json) {
            let element = this.json[key];
            const newDistance = 1 - (element.distance - min) / (max - min)
            element.distance = newDistance;
        }

        return this.json;
    }

    private calculateDistance(x, y, x2, y2) {
        if (x === x2 && y === y2) return 0;
        else return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2))
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