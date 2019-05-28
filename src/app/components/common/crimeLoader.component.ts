import * as $ from 'jquery';

export class CrimeLoader {

    public json;

    constructor () {
        this.json = (function() {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': "./assets/criminal-index-export.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json.rio_grande_do_sul;
        })();
    }

    public getJson() {
        return this.json;
    }
}