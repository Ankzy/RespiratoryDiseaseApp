import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {CookieManager, SystemInfo} from './supporting';
import { Router } from '@angular/router';


@Component({
    selector: 'admin-set-model',
    styles: [`
      .data-header {
        text-align: center;
        margin-bottom: 25px;
        margin-top: 40px;
      }
      .setmodel-div {
        width: 1500px;
  
        padding-top: 20px;
        padding-bottom: 10px;
   
        /*background-color: #e3f2fd;*/
        border-radius: 23px;
      }
      .model {
        display: inline-block;
        width: 320px;
        padding-bottom: 10px;
        
      }
      .working-button {
        
        
        width: 180px;
        border-radius: 6px;
      }
      .models-list {
        margin-left: 484px;
      }
      .icons {
        margin-left: 10px;
        width: 20px;
        height: 20px;
        margin-bottom: 2px;
       
      }
    `],
    template: `<h5 class="data-header">Установка рабочей модели</h5>
    <div class="setmodel-div">
      <ul class="models-list">
        <li *ngFor="let model of models">
          
            <div class="model">{{model.display_name}} (score {{model.test_f_score}})</div>
          
            <!--<div *ngIf="model.working">Рабочая</div>-->
            <button class="working-button" (click)="setModel(model)" [disabled]="model.working">Сделать рабочей</button>
            <img *ngIf="model.working" class='icons' src="./assets/6.jpg">
          
        </li>
      </ul>
    </div>
    `,
  providers: [HttpService]
})
export class AdminSetModelComponent implements OnInit{

  data: any;
  work: string;
  err_code: number;
  models: BestModel[] = [];

  setModel(model): any {
    const body = {command: 'set_model', args: {model_type_id: model.model_type_id}};
    this.httpService.postRequest(SystemInfo.baseUrl, body).subscribe((data: any) => {
      this.err_code = data.body['error_code'];
      if (this.err_code === 0) {
       for (let i = 0; i < this.models.length; i ++) {
         this.models[i].working = false;
       }
       model.working = true;
      }
    });
  }

  constructor(private httpService: HttpService, private route: Router){}

  ngOnInit(): any{
    if (CookieManager.getCookie('user') !== '') {
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_best_models_template').subscribe((data: any) => {
        this.models = data['data'];
        this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_working_model').subscribe((data: any) => {
          this.work = data['data']['model_type_id'];
          for (let i = 0; i < this.models.length; i++) {
            if (this.models[i].model_type_id === this.work) {
              this.models[i].working = true;
            }
          }
        });
      });
    }
    else {
      this.route.navigate(['login']);
    }
  }
}


export class BestModel {
  model_type_id	: string;
  test_f_score: number;
  display_name: string;
  working: boolean;
}


