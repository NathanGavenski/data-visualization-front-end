import * as $ from 'jquery';
// import Fs from 'fs';

export class CityLoader {

    public json;

    constructor () {
        this.json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "./assets/cities.json",
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
}