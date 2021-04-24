import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'predict-state',
    styles: [`      
      .predict-div {
        width: 1500px;
        margin: 0 auto;
        padding-top: 10px;
        text-align: center;
        /*background-color: #e3f2fd;*/
        border-radius: 23px;
      }
      .add-data{
        margin-top: 4px;
        
      }
      .ft-name {
        float: left;
        margin-left: 20px;
      }
      .inputs {
        margin-left: 80px;
        width: 210px;
        border-radius: 8px;
      }
      .selects {
        margin-left: 80px;
        width: 210px;
        border-radius: 8px;
      }
      .submit-button {
          border-radius: 16px;
          width: 180px;
          margin: 15px;
        }
      .user-header {
        text-align: center;
        margin-bottom: 25px;
      }
      .model-header {
        text-align: center;
      }
      
      input.ng-touched.ng-invalid {border:solid red 2px;}  
      input.ng-touched.ng-valid {border:solid green 2px;}
    `],
    template: `
      <h4 class='user-header'>Прогнозирование заболевания</h4>
      <h6 class='model-header'>Используемая модель: {{working_model}}</h6>
      <div class='predict-div'>
        <form #myForm="ngForm">
          <div class='add-data' *ngFor="let feature of features">
            <div class="container">
              <div class="row">
                <div class="col-4"></div>
                <div class="col-1">
                  <span class="ft-name">{{feature.feature_name}}</span>
                </div>
                <div class="col-2">
                  <input class='inputs' *ngIf="feature.feature_type=='float'" [name]="feature.feature_name" type="number" 
                         [placeholder]="feature.feature_name" [min]="feature.left_border" [max]="feature.right_border" ngModel required>
                  <select class='selects' *ngIf="feature.feature_type=='boolean'" [name]="feature.feature_name" ngModel required>
                    <option value="" disabled selected>{{feature.feature_name}}</option>
                    <option *ngFor="let app_value of feature.appropriate_values" [ngValue]="app_value">
                      {{app_value}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            
            
            <!--<input class='inputs' *ngIf="feature.feature_type=='float'" [name]="feature.feature_name" type="number" -->
                   <!--[placeholder]="feature.feature_name" [min]="feature.left_border" [max]="feature.right_border" ngModel required>-->
            <!--<select class='selects' *ngIf="feature.feature_type=='boolean'" [name]="feature.feature_name" ngModel required>-->
              <!--<option value="" disabled selected>{{feature.feature_name}}</option>-->
              <!--<option *ngFor="let app_value of feature.appropriate_values" [ngValue]="app_value">-->
                <!--{{app_value}}-->
              <!--</option>-->
            <!--</select>-->
            <!--<span class="ft-name">{{feature.feature_name}}</span>-->
          </div>
          <button class='submit-button' type="submit" (click)="submit(myForm)" [disabled]="myForm.invalid">Отправить форму</button>
        </form>
      </div>
    `
})
export class PredictStateComponent implements OnInit{

  features: Params[]=[];
  working_model: string;



  constructor(private http: HttpClient){

  }



  ngOnInit(){
    this.http.get('http://localhost:8080/system?command=get_features_template').subscribe(
      (data:any) => this.features=data['data']
    );
    this.http.get('http://localhost:8080/system?command=get_working_model').subscribe(
      (data:any) => this.working_model=data['data']['display_name']
    );
  }

  submit(form: NgForm) {
    const body = {"command": "predict_state", "args": {"data": form.value}};
    console.log(body);
    this.http.post('http://localhost:8080/system', body).subscribe((data:any) => {
      if (data['error_code'] == 0) {
        if (data.data == 0) {new alert('Рекомендуется более глубокое обследование!')}
        if (data.data == 1) {new alert('Признаки респираторных заболеваний не обнаружены.')}
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
