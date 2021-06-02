import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import {CookieManager, SystemInfo} from './supporting';
import { Router } from '@angular/router';


@Component({
    selector: 'admin-learn-model',
    styles: [
      `
        .data-header {
          
          text-align: center;
          margin-bottom: 25px;
          margin-top: 40px;
        }
        .div-type-buttons {
          width: 1500px;
          margin: 0 auto;
          padding: 15px;
          text-align: center;
          border-radius: 23px;
          
        }
        .type-button {
          width: 250px;
          height: 35px;
          border-radius: 16px;
          margin-top: 16px;
          margin-left: 20px;
          margin-right: 20px;
          margin-bottom: 30px;
       
        }
        .params {
          margin-left: 10px;
          margin-top: 4px;
        }
        .inputs {
          width: 220px;
          border-radius: 8px;
          text-align: center;
          
        }  
        .inputs::placeholder {
          text-align: center;
        }  
        .selects {
          width: 220px;
          border-radius: 8px;
          text-align: center;
          
        }  
        .submit-button {
          border-radius: 16px;
          width: 180px;
          margin: 15px;
        }
        .active {
          border-color: black;
          border-style: solid;
          border-width: 2px;
        }
        .ft-name {
          float: left;
        }
        
        input.ng-touched.ng-invalid {border:solid red 2px;}  
        input.ng-touched.ng-valid {border:solid green 2px;}
        
     
      `
    ],
    template: `<h5 class="data-header">Обучение новой модели</h5>
    <div class="div-type-buttons">
      <button class="type-button" *ngFor="let type of types" [class.active]="isActive(type)" (click)="show(type)">
        {{type.display_name}}
      </button>
      
      <div *ngFor="let type of types">
        <div *ngIf="type.is_shown">
          <form #myForm="ngForm">
            <div class='params' *ngFor="let parameter of type.parameters">
              
              <div class="container">
                <div class="row">
                  <div class="col-4">
                    
                  </div>
                  <div class="col-2">
                    <span class="ft-name">{{parameter.display_name}}</span>
                  </div>
                  <div class="col-2">
                    <input class="inputs" *ngIf="parameter.constraints.type=='Int'" [name]="parameter.parameter_name" type="number" 
                     [min]="parameter.constraints.left_border" [max]="parameter.constraints.right_border" ngModel required>
              <select class="selects" *ngIf="parameter.constraints.type=='Boolean'" [name]="parameter.parameter_name" ngModel required>
                <option value="" disabled selected>{{parameter.display_name}}</option>
                <option *ngFor="let app_value of [1, 2]" [ngValue]="app_value">
                  {{app_value}}
                </option>
              </select>
              <select class="selects" *ngIf="parameter.constraints.type=='string'" [name]="parameter.parameter_name" ngModel required>
                <option value="" disabled selected>{{parameter.display_name}}</option>
                <option *ngFor="let app_value of ['gini', 'entropy']" [ngValue]="app_value">
                  {{app_value}}
                </option>
              </select>
                  </div>
                </div>
              </div>
              
              
            </div>
            <button class='submit-button' type="submit" (click)="submit(type.model_type_id, myForm)" [disabled]="myForm.invalid">Обучить модель</button>
          </form>
        </div>
      </div>
      
   
    </div>
      
      
`,
  providers: [HttpService]
})

export class AdminLearnModelComponent implements OnInit{

  types: ModelType[] = [];
  dt: any;
  err_code: number;
  b: number = 3;
  a: Observable<number>;
  err_code2: number;
  activeButton: any;

  constructor(private httpService: HttpService, private route: Router) {}

  ngOnInit(): any {
    if (CookieManager.getCookie('user') !== '') {
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_model_types_template').subscribe(
        (data: any) => {
          this.types = data['data'];
          this.activeButton = this.types[0];
          this.types[0].is_shown = true;
        });
    }
    else {
      this.route.navigate(['login']);
    }
  }

  show(type): any {
    this.activeButton = type;
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].model_type === type.model_type) {
        this.types[i].is_shown = true;
      }
      else
        {
          this.types[i].is_shown = false;
        }
    }
  }

  isActive(buttonName): any {
    return this.activeButton === buttonName;
  }

  submit(type_id: string, form: NgForm) {
    const body = {command: 'fit_model', args: {model_type_id: type_id, model_params: form.value}};
    this.httpService.postRequest(SystemInfo.systemUrl, body).subscribe((data: any ) => {
      this.err_code = data.body['error_code'];
      if (this.err_code === 0) {
        this.err_code2 = null;
        this.dt = setInterval(() => {
          this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_last_fitted_model').subscribe((data2: any) => {
            this.err_code2 = data2['error_code'];
            console.log(typeof(this.err_code2));
            if (this.err_code2 !== 613) {
              clearInterval(this.dt);
              if (this.err_code2 === 0) {
                alert('Модель обучена!');
              }
              else {
                alert('Ошибка во время обучения модели');
              }
            }
            });
        }, 1000);
      }
      else
        {
          alert('Ошибка обучения модели (неверные данные)');
        }

    });
  }
}


export class Constraints {
  left_border: number;
  right_border: number;
  type: string;
}

export class Parameters {
  parameter_name: string;
  display_name: string;
  default_value: string;
  obligatory: string;
  appropriate_values: string;
  constraints: Constraints;
}

export class ModelType {
  model_type_id: string;
  model_type: string;
  display_name: string;
  parameters: Parameters;
  is_shown: boolean;
}
