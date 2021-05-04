import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from './http.service';
import { SystemInfo } from './supporting';
import { CookieManager } from './supporting';
import { Router } from '@angular/router';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService} from './upload.service';



@Component({
    selector: 'admin-change-data',
    styles: [`
      
      .add-header {
        margin-left: 135px;
        margin-bottom: 20px;
        margin-top: 20px;
      }
       .load-header {
        margin-left: 80px;
        margin-bottom: 20px;
        margin-top: 30px;
      }
      .list-header {
        text-align: center;
        margin-right: 40px;
        margin-bottom: 20px;
        margin-top: 20px;
      }
      .data-header {
        margin-left: 608px;
        margin-bottom: 25px;
        margin-top: 40px;
      }
      .data {
        /*background-color: #e3f2fd;*/
        margin-left: 60px;
        border-radius: 23px;
        padding-bottom: 14px;
        margin-bottom: 14px;
      }
      .data-index {
        position: absolute;
      }
      .info-button {
        margin-left: 120px;
        width: 150px;
        border-radius: 6px;
      }
      .remove-button {
        width: 150px;
        border-radius: 6px;
      }
      .div-data-form {
        padding-left: 7px;
        padding-right: 7px;
        padding-top: 15px;
        /*margin-left: 22px;*/
        /*margin-right: 15px;*/
        width: 1500px;
        margin: 0 auto;
        /*background-color: #c2c3c4;*/
        /*background-color: #e3f2fd;*/
        /*border-style: solid;*/
        /*border-width: 2px;*/
        /*border-color: black;*/
        /*border-radius: 23px;*/
      }
      .cnt-left {
        margin-left: 1px !important;
      }
      .data-form {
        width: 380px;
        margin-left: 20px;
      }
      .add-data{
        /*display: inline;*/
        margin-top: 4px;
      }
      .file-form {
        margin-left: 12px;
      }
      .inputs {
        width: 200px;
        border-radius: 8px;
      }
      .selects {
        width: 200px;
        border-radius: 8px;
        
      }
      .file-input {
        border-radius: 8px;
      }
      .submit-button {
        margin-top: 15px;
        margin-left: 115px;
        width: 180px;
        
        border-radius: 16px;
        
      }
      .file-button {
        margin-top: 15px;
        margin-left: 55px;
        width: 180px;
        
        border-radius: 16px;
        
      }
      
      .params {
        margin-bottom: 10px;
        
        text-align: left;
      }
      
      .bez {
        display: inline;
      }
      
      hr {
        background-color: black;
        opacity: 0.6;
        height: 0.5px;
        border: none;
        width: 1000px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 30px;
        }
      
      .option {
        color: red;
      }  
      
      /*[data-tooltip] {*/
    /*position: relative; !* Относительное позиционирование *! */
   /*}*/
   /*[data-tooltip]::after {*/
    /*content: attr(data-tooltip); !* Выводим текст *!*/
    /*position: absolute; !* Абсолютное позиционирование *!*/
    /*width: 300px; !* Ширина подсказки *!*/
    /*left: 0; top: 0; !* Положение подсказки *!*/
    /*background: #3989c9; !* Синий цвет фона *!*/
    /*color: #fff; !* Цвет текста *!*/
    /*padding: 0.5em; !* Поля вокруг текста *!*/
    /*box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); !* Параметры тени *!*/
    /*pointer-events: none; !* Подсказка *!*/
    /*opacity: 0; !* Подсказка невидима *!*/
    /*transition: 1s; !* Время появления подсказки *!*/
   /*} */
   /*[data-tooltip]:hover::after {*/
     /*opacity: 1; !* Показываем подсказку *!*/
     /*left: 30px; !* Положение подсказки *!*/
   /*}  */
      /*[ngbTooltip] {*/
    /*position: relative; !* Относительное позиционирование *! */
   /*}*/
   /*[ngbTooltip]::after {*/
    /*content: attr(ngbTooltip); !* Выводим текст *!*/
    /*position: absolute; !* Абсолютное позиционирование *!*/
    /*width: 300px; !* Ширина подсказки *!*/
    /*left: 0; top: 0; !* Положение подсказки *!*/
    /*background: #3989c9; !* Синий цвет фона *!*/
    /*color: #fff; !* Цвет текста *!*/
    /*padding: 0.5em; !* Поля вокруг текста *!*/
    /*box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); !* Параметры тени *!*/
    /*pointer-events: none; !* Подсказка *!*/
    /*opacity: 0; !* Подсказка невидима *!*/
    /*transition: 1s; !* Время появления подсказки *!*/
   /*} */
   /*[ngbTooltip]:hover::after {*/
     /*opacity: 1; !* Показываем подсказку *!*/
     /*left: 30px; !* Положение подсказки *!*/
     /**/
   /*}*/
      
      input.ng-touched.ng-invalid {border:solid red 2px;}  
      input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    template: `<!--<h5 class="data-header">Изменение обучающей выборки</h5>-->
    <!--<button *ngIf="!form_show" (click)="form_show=!form_show">Показать форму загрузки данных</button>-->
    <!--<div *ngIf="form_show">-->
    

    <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-5">
          <h5 class="add-header">Добавление данных</h5>
          <form class="data-form" #myForm="ngForm">
            <div class='add-data' *ngFor="let feature of features">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    
                    <span class="ft-name" data-toggle="tooltip" title="{{feature.feature_hint}}">{{feature.feature_name}}</span>
                  </div>
                  <div class="col-6">
                    <input class='inputs' *ngIf="feature.feature_type=='float'" [name]="feature.feature_name" [placeholder]="feature.feature_name" type="number" 
                           [min]="feature.left_border" [max]="feature.right_border" ngModel required>
                    <!--<select class='selects' *ngIf="feature.feature_type=='boolean'" [name]="feature.feature_name" ngModel required>-->
                      <!--<option value="" disabled selected>{{feature.feature_name}}</option>-->
                      <!--<option *ngFor="let app_value of feature.appropriate_values" [ngValue]="app_value">-->
                        <!--{{app_value}}-->
                      <!--</option>-->
                    <!--</select>-->
                    <select class='selects' *ngIf="feature.feature_name=='gender'" [name]="feature.feature_name" ngModel required>
                      <option value="" disabled selected>{{feature.feature_name}}</option>
                      <option [ngValue]="0">
                        Женский
                      </option>
                      <option [ngValue]="1">
                        Мужской
                      </option>
                    </select>
                    <select class='selects' *ngIf="feature.feature_name=='smoking'" [name]="feature.feature_name" ngModel required>
                      <option value="" disabled selected>{{feature.feature_name}}</option>
                      <option [ngValue]="0">
                        Некурящий
                      </option>
                      <option [ngValue]="1">
                        Курящий
                      </option>
                    </select>
                    <select class='selects' *ngIf="feature.feature_name=='diseasehypertonia'" [name]="feature.feature_name" ngModel required>
                      <option value="" disabled selected>{{feature.feature_name}}</option>
                      <option [ngValue]="0">
                        Отсутствует
                      </option>
                      <option [ngValue]="1">
                        Присутствует
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="add-data">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <span class="ft-name" data-toggle="tooltip" title="Наличие респитарного заболевания">respiratory disease</span>
                  </div>
                  <div class="col-6">
                    <select class='selects' name="respiratory_disease" ngModel required>
                      <option value="" disabled selected>respiratory_disease</option>
                      <option [ngValue]="0">
                        Нет
                      </option>
                      <option [ngValue]="1">
                        Да
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button class="submit-button" type="submit" (click)="submit(myForm)" [disabled]="myForm.invalid">Добавить </button>
          </form>
          
          <h5 class="load-header">Загрузка данных в формате CSV</h5>
          <div class="container">
            <div class="row">
              <div class="col-1">
                
              </div>
              <div class="col-8">
                <form class="file-form">
                  <div>
                    <input class="form-control file-input" type='file' (change)='convertFile(input)' id='fileInput' #input>
                  </div>
                  <div>
                    <button class='file-button' type="submit" (click)="submitCSV()">Загрузить</button>
                  </div>
                </form>
              </div>
              <div class="col-3">
                
              </div>
            </div>
          </div>
          
         
        
        </div>
        
        <div class="col-6">
          <h5 class="list-header">Список данных</h5>
          <div class="data">
            <ul>
              <!--<img *ngIf="loading" src="/assets/2.jpg" alt="loading" />-->
<!--<img [hidden]="loading" (load)="onLoad()" src="/assets/3.jpg" />-->
              <li *ngFor="let one of sample; index as i">
                <span class="data-index">ЭКГ №{{i+1}}</span>
                <button class="info-button" (click)="info(one)">Подробнее</button>
                <button class="remove-button" (click)="remove(one, i)">Удалить</button>
                <div class='params' *ngIf="one.isshown">
                  <div *ngFor="let param of one | keyvalue">
                    <div *ngIf="param.key!='isshown' && param.key!='row_id'">
                      <b>{{param.key}}</b> : <i>{{param.value}}</i>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `,
  providers: [HttpService, UploadService],
})

export class AdminChangeDataComponent implements OnInit {

  sample: Data[] = [];
  features: Params[] = [];
  form_show: boolean = false;
  err_code: number;
  err_code2: number;
  text: any;
  JSONData: any;
  tooltipText: string = 'asd';





  constructor(private httpService: HttpService, private route: Router, private uploadService: UploadService) {
  }

  ngOnInit(): any {
    if (CookieManager.getCookie('user') !== '') {
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_features_template').subscribe(
        (data: any) => this.features = data['data']);
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_fitting_data').subscribe(
        (data: any) => this.sample = data['data']);
    }
    else {
      this.route.navigate(['login']);
    }
  }

  loading: boolean = true;

  onLoad() {
    this.loading = false;
    console.log('ads')
  }

  info(model): any {
    if (model.isshown !== false && model.isshown !== true) {
      model.isshown = true;
    }
    else {
      model.isshown = !model.isshown;
    }
  }

  remove(model, i): any {
    if (confirm('Are you want to delete item ' + model.row_id + '?')) {
      const body = {command: 'remove_fitting_data', args: {row_ids: [model.row_id]}};
      this.httpService.postRequest(SystemInfo.baseUrl, body).subscribe((data: any) => {
        this.err_code = data.body['error_code'];
        if (this.err_code === 0) {
          alert('Данные удалены');
          this.sample.splice(i, 1);
        }
        else {
          alert('Ошибка! Данные не удалось удалить.');
        }
      });
    }
  }

  submit(form: NgForm): any {
    const body = {command: 'add_fitting_data', args: {rows: [form.value]}};
    console.log(body);
    this.httpService.postRequest(SystemInfo.systemUrl, body).subscribe((data: any) => {
      this.err_code2 = data.body['error_code'];
      if (this.err_code2 === 0) {
        alert('Данные добавлены.');
      }
      else {
        alert('Ошибка добавления данных');
      }
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_fitting_data').subscribe(
        (data: any) => this.sample = data['data']);
    });
  }

  submitCSV() {

    const body = {command: 'load_csv', args: {file: this.JSONData}};
    this.httpService.postRequest(SystemInfo.systemUrl, body).subscribe((data: any) => {
      this.err_code = data.body['error_code'];
      if (this.err_code === 0) {
        alert('Данные загружены.');
      }
      else {
        alert('Ошибка загрузки данных');
      }
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_fitting_data').subscribe(
        (data: any) => this.sample = data['data']);
    });

  }

  csvJSON(csvText) {

    var lines = csvText.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    console.log(headers);
    for (var i = 1; i < lines.length-1; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    console.log(JSON.stringify(result)); //JSON
    this.JSONData = JSON.stringify(result);

  }


  convertFile(input) {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let text = reader.result;
      this.text = text;
      console.log(text);
      this.csvJSON(text);
    };
  }
}


export class Data {
  row_id: string;
  age: number;
  gender: number;
  smoking: number;
  diseasehypertonia: number;
  p_a: number;
  p_da: number;
  t_right_slopes: number;
  interval_pq: number;
  kurtosis: number;
  nn50: number;
  lfp: number;
  br: number;
}

export class Params {
  feature_id:	string;
  alias: Alias;
  feature_name:	string;
  feature_hint: string;
  display_name: string;
  appropriate_values:	Array<number>;
  left_border:	number;
  right_border:	number;
  feature_type:	string;
}

export class Alias {
  0: string;
  1: string;
}

// export class Params2 {
//   feature_id:	string;
//   feature_name:	string;
//   display_name: string;
//   appropriate_values:	Array<number>;
//   left_border:	number;
//   right_border:	number;
//   feature_type:	string;
// }
