import { Component, OnInit } from '@angular/core';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { LineString } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat, transform } from 'ol/proj';
import { CommonStyle } from '../common/style.component';
import { CityLoader } from '../common/cityLoader.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private commonStyle = new CommonStyle();
  private cities = new CityLoader();

  public citiesInfo = this.cities.getJson()
  public styles = this.commonStyle.styles;

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
    var vectorSource = new VectorSource();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];
      
      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      const line = new LineString(cityCoordinates)
      const features = new Feature(line)
      vectorSource.addFeature(features)
    }

    var vectorLayer = new VectorLayer({
      source: vectorSource,
      style: this.styleFunction
    })

    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([-50, -30]),
        zoom: 7
      })
    });
  }




}
