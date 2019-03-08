import { Component, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { AvailableDatesService, MappedLayer, LayeredMapComponent, Bounds, Layer, Publication } from 'map-wald';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [GoogleMapsAPIWrapper]
})
export class AppComponent {
  @ViewChild(LayeredMapComponent) map: LayeredMapComponent;
  showWindows = true;

  layers: Array<MappedLayer> = [];
  title = 'grafs';

  params = {
    layers: 'wetness',
    transparent: true,
    tiled: true,
    styles: 'boxfill/anu_fmc_rdylbu_9',
    colorscalerange:'0,250',
    abovemaxcolor:'extend'
  }

  fullExtent: Bounds = {
    east: -180,
    north: -55,
    south: -55,
    west: 180
  };

  date = new Date(2019,0,1);

  constructor(private dates:AvailableDatesService  ) {
    setTimeout(() => {
      const l = new Layer();
      console.log(l.options);
      l.options = {
        host: {
          software:'tds',
          url:environment.tds_server
        }
      }

      l.publications = [
        new Publication({
          options:{
            filepath: '/ub8/global/GRAFS/Surface_Wetness_from_API_analysis_window_{{year}}.nc',
            variable: 'wetness',
            palette: 'anu_fmc_rdylbu_9',
            styles:'boxfill/anu_fmc_rdylbu_9',
            colorscalerange: [
              0,
              1
            ],
            transparent:true,
            // belowmincolor:'transparent',
            // abo
            timeFormat: '{{year}}-{{month}}-{{day}}'
          }
        })
      ];
      l.propagateOptions();

      const ml = new MappedLayer({
//        url:environment.tds_server + '/wms/ub8/global/GRAFS/API_analysis_window_20190203.nc',
        wmsParameters: this.params,
        layer:l
      });
      ml.update();

      this.dates.availableDates(ml,2019).subscribe(stuff=>{
        console.log(stuff);
        ml.options.date = stuff[0];
        ml.update();
        this.layers = [ml];
      });
    }, 5);
  }

  updateDate(){
    console.log(this.date);
    this.layers[0].options.date = this.date;
    this.layers[0].update();
    //this.layers = [this.layers[0]];

  }
}
