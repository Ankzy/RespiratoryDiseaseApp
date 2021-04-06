import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'predict-state',
    template: `
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
    </form>`
})
export class PredictStateComponent implements OnInit{

  features: Params[]=[];



  constructor(private http: HttpClient){

  }



  ngOnInit(){
    this.http.get('http://localhost:8080/system?command=get_features_template').subscribe(
      (data:any) => this.features=data['data']
    );
  }

  submit(form: NgForm) {
    const body = {"command": "predict_state", "args": {"data": form.value}};
    console.log(body);
    this.http.post('http://localhost:8080/system', body).subscribe((data:any) => {
      if (data['error_code'] == 0) {
        new alert('Результат: ' + data.data)
      }
      else
        {
          console.log(JSON.stringify(data))
          new alert('Нет результата')
        }
    });
  }



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
