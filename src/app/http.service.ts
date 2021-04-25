import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){}

  public postRequest(url: string, requestBody: any): any{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.http.post(url, requestBody, httpOptions);
  }

  public getRequest(url: string): any{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.get(url, httpOptions);
  }
}
