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
}