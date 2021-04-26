import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {CookieManager} from './supporting';


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
    `,
  providers: [HttpService]
})

export class PredictStateComponent implements OnInit{

  features: Params[] = [];
  working_model: string;

  constructor(private httpService: HttpService, private route: Router){}

  ngOnInit(): any{
    if (CookieManager.getCookie('user') !== '') {
      this.httpService.getRequest('http://localhost:8080/system?command=get_features_template').subscribe(
        (data: any) => this.features = data['data']
      );
      this.httpService.getRequest('http://localhost:8080/system?command=get_working_model').subscribe(
        (data: any) => this.working_model = data['data']['display_name']
      );
    }
    else{
      this.route.navigate(['login']);
    }
  }

  submit(form: NgForm) {
    const body = {command: 'predict_state', args: {data: form.value}};
    console.log(body);
    this.httpService.postRequest('http://localhost:8080/system', body).subscribe((data: any) => {
      if (data.body['error_code'] === 0) {
        if (data.body.data === 0) { alert('Рекомендуется более глубокое обследование!'); }
        if (data.body.data === 1) { alert('Признаки респираторных заболеваний не обнаружены.'); }
      }
      else
        {
          console.log(JSON.stringify(data));
          alert('Нет результата');
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
