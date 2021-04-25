import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from "../../node_modules/@angular/common/http";

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){}

  public postRequest(url: string, body: any): any{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response'
    };

    this.http.post(url, body, httpOptions).subscribe((data: any) => {
      return data;
    });
  }

  public getRequest(url: string, body: any): any{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };

    this.http.get('http://localhost:8080/system?command=get_fitting_history', httpOptions).subscribe(
      (data:any) => {
        return data;
      });
  }

  // b: any;
  //
  //     getSum(request: string){
  //
  //     if (request=='get_best_models_template') {this.b = this.http.get('http://localhost:8080/system?command=' + request)};
  //
  //     return this.b
  //   }
}
