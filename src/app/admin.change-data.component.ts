import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'admin-change-data',
    template: `<h3>Изменение обучающей выборки</h3>
    <button *ngIf="!form_show" (click)="form_show=!form_show">Показать форму загрузки данных</button>
    <div *ngIf="form_show">
      <button (click)="form_show=!form_show">Скрыть форму загрузки данных</button>
      <form #myForm="ngForm">
        <div *ngFor="let feature of features">
          {{feature.feature_name}}
          <input *ngIf="feature.feature_type=='float'" [name]="feature.feature_name" type="number" 
                 [min]="feature.left_border" [max]="feature.right_border" ngModel required>
          <select *ngIf="feature.feature_type=='boolean'" [name]="feature.feature_name" ngModel required>
            <option *ngFor="let app_value of feature.appropriate_values" [ngValue]="app_value">
              {{app_value}}
            </option>
          </select>
        </div>
            <button type="submit" (click)="submit(myForm)" [disabled]="myForm.invalid">Отправить форму</button>
      </form>
      
    </div>
    <ul>
      <li *ngFor="let one of sample; index as i">
        {{one.row_id}}
        <button (click)="info(one)">Подробнее</button>
        <button (click)="remove(one, i)">Удалить</button>
        <div *ngIf="one.isshown">
          <div *ngFor="let param of one | keyvalue">
            <i>{{param.key}}</i> : <i>{{param.value}}</i>
          </div>
        </div>
      </li>
    </ul>`
})
export class AdminChangeDataComponent implements OnInit{

  sample: Data[]=[];
  features: Params[]=[];
  form_show: boolean=false;
  err_code: number;
  err_code2: number;


  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.http.get('http://localhost:8080/system?command=get_fitting_data').subscribe(
      (data:any) => this.sample=data['data']
    );
    this.http.get('http://localhost:8080/system?command=get_features_template').subscribe(
      (data:any) => this.features=data['data']
    );
  }

  info(model) {
    if (model.isshown != false && model.isshown != true) {model.isshown = true}
    else {model.isshown = !model.isshown}
  }

  remove(model, i) {
    if(confirm('Are you want to delete item ' + model.row_id + '?')){
      const body = {'command': 'remove_fitting_data', 'args': {'row_ids': [model.row_id]}};
      this.http.post('http://127.0.0.1:8080/', body).subscribe((data: any) => {
        this.err_code=data['error_code'];
        if (this.err_code == 0) {
          new alert("Данные удалены");
          this.sample.splice(i, 1);
        }
        else {new alert("Ошибка! Данные не удалось удалить.")}
      }
      );
    }
  }

  submit(form: NgForm) {
    const body = {"command": "add_fitting_data", "args": {"rows": [form.value]}};
    console.log(body)
    this.http.post('http://localhost:8080/system', body).subscribe((data:any) => {
      this.err_code2=data['error_code'];
      if (this.err_code2 == 0) {
        new alert('Данные добавлены.')
      }
      else
        {
          new alert('Ошибка добавления данных')
        }
    });
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
  feature_name:	string;
  display_name: string;
  appropriate_values:	Array<number>;
  left_border:	number;
  right_border:	number;
  feature_type:	string;
}


export class Params2 {
  feature_id:	string;
  feature_name:	string;
  display_name: string;
  appropriate_values:	Array<number>;
  left_border:	number;
  right_border:	number;
  feature_type:	string;
}
