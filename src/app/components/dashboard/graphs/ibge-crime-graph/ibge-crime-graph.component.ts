import { Component, OnInit } from '@angular/core';

import Plotly from 'plotly.js-dist';

import { IBGECrimeClusterLoader } from 'src/app/components/common/ibgeCrimeClusterLoader.components';
import { DashboardUpdateService } from 'src/app/services/dashboard-update.service';

@Component({
  selector: 'app-ibge-crime-graph',
  templateUrl: './ibge-crime-graph.component.html',
  styleUrls: ['./ibge-crime-graph.component.scss']
})
export class IbgeCrimeGraphComponent implements OnInit {

  private layout;
  private traces = [];
  private colorArray = [];

  constructor (service: DashboardUpdateService) {
    this.colorArray = service.colorArray;
  }

  ngOnInit() {
    if (this.traces.length > 0) {
      Plotly.newPlot('content_total', this.traces, this.layout);
    } else this.createTotalGraph()
  }

  private createTotalGraph () {
    const loader = new IBGECrimeClusterLoader();
    const dt = loader.getJson ();

    const labels = [];
    for (let key in dt) {
      labels.push(dt[key].Label);
    }
    const unique_labels = labels.filter((v, i, a) => a.indexOf(v) === i);
    const length_labels = unique_labels.length;
    const x_all = new Array(length_labels);
    const y_all = new Array(length_labels);
    const text_all = new Array(length_labels);
    let min_x;
    let max_x;
    let min_y;
    let max_y;

    for (let i = 0; i < x_all.length; i++) {
      x_all[i] = [];
      y_all[i] = [];
      text_all[i] = [];
    }
    for (let key in dt) {
      const e = dt[key];
      x_all[e.Label].push(e.x);
      y_all[e.Label].push(e.y);
      text_all[e.Label].push(key);
      if (i == 1) {
        min_x = e.x;
        max_x = e.x;
        min_y = e.y;
        max_y = e.y;
        i = 0;
      } else {
        if (e.x < min_x) min_x = e.x;
        else if (e.x > max_x) max_x = e.x;
        if (e.y < min_y) min_y = e.y;
        else if (e.y > max_y) max_y = e.y;
      }
    }
    max_x = max_x + 1.0;
    min_x = min_x - 1.0;
    max_y = max_y + 1.0;
    min_y = min_y - 1.0;
    this.traces = [];
    for (var i = 0; i < x_all.length; i++) {
      this.traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers',
        type: 'scatter',
        name: 'Cluster ' + i,
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { 
          size: 9,
          color: this.colorArray[i]
        }
      } );
    }

    this.layout = {
      xaxis: {
        range: [ min_x, max_x ]
      },
      yaxis: {
        range: [ min_y, max_y ]
      },
      title: "Distribuição dos Dados do IBGE + Criminais"
    };

    Plotly.newPlot('content_total', this.traces, this.layout);

  }

}
