import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { SystemInfo} from './supporting';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpService: HttpService) {}

  public upload(formData): any {
    return this.httpService.postRequest<any>(SystemInfo.systemUrl, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }
}


