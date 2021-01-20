import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import {NotifierService} from "angular-notifier";
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicadores-power-bi',
  templateUrl: './indicadores-power-bi.component.html',
  styleUrls: ['./indicadores-power-bi.component.scss']
})
export class IndicadoresPowerBiComponent implements OnInit {

  constructor(private api: ApiService,
    private notifier: NotifierService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUrl();
  }

  async getUrl(){
    const response = await this.api.get(`${environment.apiBackend}/indicador-power-bi/get-url`);
    if(response.success){
      window.open(response.data.url, '_blank');
      this.notifier.notify('success', response.message);
    }else{
      this.notifier.notify('warning', response.message);
    }
    this.router.navigate(['/dashboard']);
  }

}
