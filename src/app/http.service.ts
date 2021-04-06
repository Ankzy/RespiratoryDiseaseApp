import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){ }

    // getSum(request: string){
    //     return this.http.get('http://localhost:8080/system?command=' + request);
    // }

  b: any;

      getSum(request: string){

      if (request=='get_best_models_template') {this.b = this.http.get('http://localhost:8080/system?command=' + request)};

      return this.b
    }
}
