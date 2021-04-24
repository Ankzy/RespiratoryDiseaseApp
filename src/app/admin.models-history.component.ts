import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from "../../node_modules/@angular/common/http";

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
          </div>
        </li>
      </ul>
    </div>
    `
})
export class AdminModelsHistoryComponent implements OnInit{

  static readCookie(name: string): any {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  static setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

  models: Model[]=[];

  info(model) {
    if (model.isshown != false && model.isshown != true) {model.isshown = true}
    else
    {model.isshown = !model.isshown}
  }

  constructor(private http: HttpClient){

  }

  ngOnInit(){

    const userLogin = AdminModelsHistoryComponent.readCookie('user');
    console.log('History: ' + userLogin);
    console.log('COK' + document.cookie);

    // let headers = new HttpHeaders();
    // headers.append('user', userLogin);
    //
    // const httpOptions = {
    //   headers: headers
    // };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };


    this.http.get('http://localhost:8080/system?command=get_fitting_history', httpOptions).subscribe(
      (data:any) => {
        this.models = data['data'];
      }
    );
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


