import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
    selector: 'admin-models-history',
    // styles: [`
    //   .mdlname {display: inline-block;}
    // `],
    template: `<h3>История обучения моделей</h3>
    <div>{{data}}</div>
    <ul>
      <li *ngFor="let model of models">
        <p class='mdlname'>Модель {{model.id}}</p>
        <button (click)="info(model)">Подробнее</button>
        <div *ngIf="model.isshown">
          <p>{{model.model_type_id}}</p>
          <p>{{model.parameters}}</p>
          <p>{{model.train_accuracy}}</p>
          <p>{{model.train_recall}}</p>
          <p>{{model.train_precision}}</p>
          <p>{{model.train_f_score}}</p>
          <p>{{model.test_accuracy}}</p>
          <p>{{model.test_recall}}</p>
          <p>{{model.test_precision}}</p>
          <p>{{model.test_f_score}}</p>
        </div>
        <div *ngIf="model.isshown">
          <div *ngFor="let param of model | keyvalue">
            <b>{{param.key}}</b> : <b>{{param.value}}</b>
          </div>
        </div>
      </li>
    </ul>`
})
export class AdminModelsHistoryComponent implements OnInit{


  data: any;
  models: Model[]=[];

  info(model) {
    if (model.isshown != false && model.isshown != true) {model.isshown = true}
    else
    {model.isshown = !model.isshown}
  }

  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.http.get('http://localhost:8080/system?command=get_fitting_history').subscribe(
      (data:any) => this.models=data['data']
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


