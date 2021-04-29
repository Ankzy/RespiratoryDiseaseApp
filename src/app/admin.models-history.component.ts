import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {CookieManager, SystemInfo} from './supporting';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-models-history',
    styles: [`
      .data-header {
        text-align: center;
        margin-bottom: 25px;
        margin-top: 40px;
      }
      .history-div {
        width: 1500px;
     
        padding-top: 20px;
        margin-left: 460px;
        /*background-color: #e3f2fd;*/
        border-radius: 23px;
      }
      .info-button {
        margin-left: 420px;
        width: 140px;
        border-radius: 6px;
      }
      .data-index {
        position: absolute;
    
      }
      .params {
        margin-bottom: 10px;
        text-align: left;
      }
      [data-tooltip] {
    position: relative; /* Относительное позиционирование */ 
   }
   [data-tooltip]::after {
    content: attr(data-tooltip); /* Выводим текст */
    position: absolute; /* Абсолютное позиционирование */
    width: 300px; /* Ширина подсказки */
    left: 0; top: 0; /* Положение подсказки */
    background: #3989c9; /* Синий цвет фона */
    color: #fff; /* Цвет текста */
    padding: 0.5em; /* Поля вокруг текста */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Параметры тени */
    pointer-events: none; /* Подсказка */
    opacity: 0; /* Подсказка невидима */
    transition: 1s; /* Время появления подсказки */
   } 
   [data-tooltip]:hover::after {
    opacity: 1; /* Показываем подсказку */
    left: 6em; /* Положение подсказки */
     
   }
    `],
    template: `<h5 class="data-header">История обучения моделей</h5>
    <div class="history-div">
      <ul>
        <li *ngFor="let model of models; index as i">
          <span class="data-index">{{model.display_name}} {{model.date}} (score {{model.test_f_score}})</span>
          <button class="info-button" (click)="info(model)">Подробнее</button>
          <div class="params" *ngIf="model.isshown">
            <div *ngFor="let param of model | keyvalue">
              <div *ngIf="param.key!='isshown' && param.key!='model_type_id' && param.key!='id' && param.key!='parameters'">
                <b>{{param.key}}</b> : <i>{{param.value}}</i>
              </div>
              <!--<div *ngIf="param.key=='parameters'">-->
                <!--<b>{{param.key}}</b> : <i>{{param.value}}</i>-->
                <!---->
              <!--</div>-->
            </div>
            <!--<p class='help' data-tooltip="Всплывающая подсказка">asd</p>-->
          </div>
        </li>
      </ul>
    </div>
    `,
  providers: [HttpService]
})
export class AdminModelsHistoryComponent implements OnInit{

  models: Model[] = [];

  info(model): any{
    if (model.isshown !== false && model.isshown !== true) { model.isshown = true; }
    else { model.isshown = !model.isshown; }
  }

  constructor(private httpService: HttpService, private route: Router){}

  ngOnInit(): any {
    if (CookieManager.getCookie('user') !== '') {
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_fitting_history').subscribe(
        (data: any) => {
          this.models = data['data'];
        });
    }
    else{
      this.route.navigate(['login']);
    }
  }
}

export class Model {
  id: string;
  model_type_id	: string;
  parameters: string;
  train_accuracy: number;
  train_recall: number;
  train_precision: number;
  train_f_score: number;
  test_accuracy: number;
  test_recall: number;
  test_precision: number;
  test_f_score: number;
  date: string;
}

export class Params {
  max_depth: number;
}


