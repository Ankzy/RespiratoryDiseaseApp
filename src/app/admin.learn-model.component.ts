import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'admin-learn-model',
    template: `<h3>Обучение новой модели</h3>
    <button *ngFor="let type of types" (click)="show(type)">
      {{type.display_name}}
    </button>
      <div *ngFor="let type of types">
        <div *ngIf="type.is_shown">
          <form #myForm="ngForm">
            <div *ngFor="let parameter of type.parameters">
              {{parameter.parameter_name}}
              <input *ngIf="parameter.constraints.type=='Int'" [name]="parameter.parameter_name" type="number" 
                     [min]="parameter.constraints.left_border" [max]="parameter.constraints.right_border" ngModel required>
              <input *ngIf="parameter.constraints.type=='Boolean'" [name]="parameter.parameter_name" type="checkbox" 
                     ngModel required>
            </div>
            <button type="submit" (click)="submit(type.model_type_id, myForm)" [disabled]="myForm.invalid">Отправить форму</button>
          </form>
        </div>
      </div>
      
`
})
export class AdminLearnModelComponent implements OnInit{

  types: ModelType[]=[];
  dt: any;
  err_code: number;
  b: number=3;
  a: Observable<number>;
  err_code2: number;



  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('http://localhost:8080/system?command=get_model_types_template').subscribe(
      (data:any) => this.types=data['data']
      );
  }

  show(type) {
    for (var i = 0; i < this.types.length; i++) {
      if (this.types[i].model_type == type.model_type) {
        this.types[i].is_shown = true
      }
      else
        {
          this.types[i].is_shown = false
        }
    }
  }

  submit(type_id: string, form: NgForm) {
    const body = {'command': 'fit_model', 'args': {'model_type_id': type_id, 'model_params': form.value}};
    this.http.post('http://localhost:8080/system', body).subscribe((data:any) => {
      this.err_code=data['error_code'];
      if (this.err_code == 0) {

        this.err_code2 = null;
        this.dt = setInterval(() => {

          this.http.get('http://localhost:8080/system?command=get_last_fitted_model').subscribe((data2:any) => {
            this.err_code2 = data2['error_code'];
            console.log(this.err_code2)
            if (this.err_code2!=612) {
              clearInterval(this.dt)
              if (this.err_code2==0) {
                new alert('Модель обучена!')
              }
              else {
                new alert('Ошибка во время обучения модели')
              }
            }
            })


        }, 1000)

      }
      else
        {
          new alert('Ошибка обучения модели (неверные данные)')
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
