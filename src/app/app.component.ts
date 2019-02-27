import { Component, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { WMSLayerComponent } from 'map-wald';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [GoogleMapsAPIWrapper]
})
export class AppComponent {
  @ViewChild('wms') wmsLayer: WMSLayerComponent;
  showWindows = true;

  title = 'grafs';
  url: string// = environment.tds_server + 'wms/ub8/global/GRAFS/API_analysis_window_20190203.nc';
  params = {
    layers: 'API',
    transparent: true,
    tiled: true,
    styles: 'boxfill/anu_fmc_rdylbu_9',
    colorscalerange:'0,250',
    abovemaxcolor:'extend'
  }

  constructor(  ) {
    setTimeout(() => {
      this.url = environment.tds_server + '/wms/ub8/global/GRAFS/API_analysis_window_20190203.nc';
    }, 5);
  }
}
