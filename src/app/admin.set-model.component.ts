import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Component({
    selector: 'admin-set-model',
    template: `<h3>Установка рабочей модели</h3>
    <!--<div *ngFor="let model of models">-->
      <!--{{model.test_f_score}}-->
    <!--</div>-->
    <ul>
      <li *ngFor="let model of models">
        <div>
          <p>{{model.model_type_id}}</p>
          <div *ngIf="model.working">Рабочая</div>
          <button (click)="setModel(model)">Сделать рабочей</button>
        </div>
      </li>
    </ul>`
})
export class AdminSetModelComponent implements OnInit{


  data: any;
  work: string;
  err_code: number;
  models: BestModel[]=[];


  setModel(model){
    const body = {'command': 'set_model', 'args': {'model_type_id': model.model_type_id}};
    this.http.post('http://localhost:8080/', body).subscribe((data:any) => {
      this.err_code=data['error_code'];
      if (this.err_code == 0) {
       for (var i = 0; i < this.models.length; i ++) {
         this.models[i].working = false
       }
       model.working = true;
      }
    });
  }

  constructor(private http: HttpClient){
  }

  ngOnInit(){
    this.http.get('http://localhost:8080/system?command=get_best_models_template').subscribe((data:any) => {
      this.models=data['data'];

      this.http.get('http://localhost:8080/system?command=get_working_model').subscribe((data:any) => {
      this.work=data['data']['model_type_id'];
      for (var i = 0; i < this.models.length; i++) {
        if (this.models[i].model_type_id == this.work) {
          this.models[i].working = true;
        }
      }
      });
    });
  }

}


export class BestModel {
  model_type_id	: string;
  test_f_score: number;
  working: boolean;
}


