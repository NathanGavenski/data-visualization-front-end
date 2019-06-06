import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Select from 'ol/interaction/Select.js';
import { Polygon } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat, transform } from 'ol/proj';
import { CommonStyle } from '../common/style.component';
import { CityLoader } from '../common/cityLoader.component';
import { pointerMove } from 'ol/events/condition.js';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Fill, Style } from 'ol/style';
import { CrimeClusterLoader } from '../common/crimeClusterLoader.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() citySelected = new EventEmitter;
  @Input() dashboard: DashboardComponent;

  private commonStyle = new CommonStyle();
  private cities = new CityLoader();

  private citiesInfo = this.cities.getJson()
  private styles = this.commonStyle.styles;
  private vectorLayer;

  public map: Map;
  public geojsonObject = {
    "type": "FeatureCollection",
    "crs": {
      "type": "name",
      "properties": {
        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
      }
    },
    "features": [
      {
        "type": "Feature",
        "properties": {
          "Name": "PORTO ALEGRE",
          "Description": "PORTO ALEGRE \/ RS"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -51.127285534599707,
              -29.954498621414189
            ],
            [
              -51.086367788042928,
              -29.970881204204144
            ],
            [
              -51.084771971649097,
              -30.04607410593519
            ],
            [
              -51.123616154961553,
              -30.055962459399947
            ],
            [
              -51.076138828044456,
              -30.175372185178158
            ],
            [
              -51.011942198673466,
              -30.198930770638523
            ],
            [
              -51.067839498394108,
              -30.250795244105174
            ],
            [
              -51.183466731404508,
              -30.233303078674112
            ],
            [
              -51.199723166291044,
              -30.19324623962223
            ],
            [
              -51.232546468544626,
              -30.183036443277221
            ],
            [
              -51.230900928634924,
              -30.137635636575336
            ],
            [
              -51.262011696882261,
              -30.121795297315092
            ],
            [
              -51.233423372290758,
              -30.055619228644446
            ],
            [
              -51.271899644752743,
              -30.038972080596974
            ],
            [
              -51.261811425057196,
              -30.009642552761537
            ],
            [
              -51.305833467640355,
              -29.950306382233688
            ],
            [
              -51.265662532499846,
              -29.934631324875681
            ],
            [
              -51.233640330137064,
              -29.93771516312421
            ],
            [
              -51.22069554616246,
              -29.967092995345411
            ],
            [
              -51.127285534599707,
              -29.954498621414189
            ]
          ]
        }
      }
    ]
  }

  public styleFunction = (feature) => {
    return this.styles[feature.getGeometry().getType()];
  };

  ngOnInit() {
    // this.createMap();
    this.colorClusters();
    this.hooverInteraction();
    this.clickInteraction();
  }

  private hooverInteraction() {
    const select = new Select({
      condition: pointerMove
    });

    this.map.addInteraction(select);
    select.on('select', function (e) {
      if (e.selected.length > 0) {
        // console.log(e.selected[0].values_.name)
        // TODO: Create modal with city name while hoovering.
      }
    }
    );
  }

  private clickInteraction() {
    const select = new Select();

    this.map.addInteraction(select);
    select.on('select', (e) => {
      if (e.selected.length > 0) {
        this.dashboard.clicked_city(e.selected[0].values_.name)
      }
    });
  }

  private colorClusters() {
    const colorArray = [
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

    let vectorSource = new VectorSource();
    const clusterLoader = new CrimeClusterLoader();
    const crimeCluster = clusterLoader.getJson();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        console.log(crimeCluster[name].Label)
      } catch (TypeError) {
        console.log(feature.properties.Name)
      }

      const line = new Polygon([cityCoordinates]);
      const features = new Feature(line);
      features.set('name', feature.properties.Name);
      features.setStyle(new Style({ fill: new Fill({ color: '#FF6633'}) }));
      vectorSource.addFeature(features)
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([-53, -30]),
        zoom: 7
      })
    });

  }

  createMap() {
    var vectorSource = new VectorSource();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      const line = new Polygon([cityCoordinates])
      const features = new Feature(line)
      features.set('name', feature.properties.Name)
      vectorSource.addFeature(features)
    }

    this.vectorLayer = new VectorLayer({
      source: vectorSource,
      style: this.styleFunction
    })

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([-53, -30]),
        zoom: 7
      })
    });
  }

  private makeSortString = (function() {
    var translate_re = /[öäüãáçóõéôÖÄÜÃÁÇÓÕÔÉ]/g;
    var translate = {
      "ä": "a", "ö": "o", "ü": "u",
      "Ä": "A", "Ö": "O", "Ü": "U",
      "ã": "a", "õ": "o", "á": "a",
      "Ã": "A", "Õ": "O", "ô": "o",
      "É": "E", "é": "e", "ó": "o",
      "Ó": "O", "Ç": "C", "ç": "c",
      "Ê": "E", "ê": "e"  // probably more to come
    };
    return function(s) {
      return ( s.replace(translate_re, function(match) { 
        return translate[match]; 
      }) );
    }
  })();

  private andrey() {
    // this.map.addLayer(this.landmarks);
  }



}

