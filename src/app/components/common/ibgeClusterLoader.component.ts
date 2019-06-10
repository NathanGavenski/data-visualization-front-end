import * as $ from 'jquery';

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
        const point = this.json[city.toUpperCase()]
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
}