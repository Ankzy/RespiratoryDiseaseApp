import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {CookieManager, SystemInfo} from './supporting';
import { Router } from '@angular/router';


@Component({
    selector: 'admin-users',
    styles: [`
      .data-header {
        text-align: center;
        margin-bottom: 25px;
        margin-top: 40px;
      }
      .setuser-div {
        width: 1500px;
        padding-top: 20px;
        padding-bottom: 10px;
        border-radius: 23px;
      }
      .user {
        display: inline-block;
        width: 280px;
        padding-bottom: 10px;
        
      }
      .working-button {
        
        
        width: 240px;
        border-radius: 6px;
      }
      .users-list {
        margin-left: 484px;
      }
    `],
    template: `<h5 class="data-header">Управление пользователями</h5>
    <div class="setuser-div">
      <ul class="users-list">
        <li *ngFor="let user of users">
          
          <div class="user">{{user.login}} (<span *ngIf="user.admin">Администратор</span> <span *ngIf="!user.admin">Пациент</span>)</div>
          
          <button *ngIf="!user.admin" class="working-button" (click)="setAdmin(user)">Сделать администратором</button>
          <button *ngIf="user.admin" class="working-button"  (click)="setPatient(user)">Сделать пациентом</button>
          
        </li>
      </ul>
    </div>
    `,
  providers: [HttpService]
})
export class AdminUsersComponent implements OnInit{

  data: any;
  work: string;
  err_code: number;
  users: User[] = [];

  setAdmin(user): any {
    const body = {command: 'set_admin_role', args: {login: user.login, admin_role: 1}};
    this.httpService.postRequest(SystemInfo.baseUrl, body).subscribe((data: any) => {
      this.err_code = data.body['error_code'];
      if (this.err_code === 0) {
        this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_users').subscribe((data: any) => {
        this.users = data['data'];
      });
      }
    });
  }

  setPatient(user): any {
    const body = {command: 'set_admin_role', args: {login: user.login, admin_role: 0}};
    this.httpService.postRequest(SystemInfo.baseUrl, body).subscribe((data: any) => {
      this.err_code = data.body['error_code'];
      if (this.err_code === 0) {
        this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_users').subscribe((data: any) => {
        this.users = data['data'];
      });
      }
    });
  }

  constructor(private httpService: HttpService, private route: Router){}

  ngOnInit(): any{
    if (CookieManager.getCookie('user') !== '') {
      this.httpService.getRequest(SystemInfo.systemUrl + '?command=get_users').subscribe((data: any) => {
        this.users = data['data'];
      });
    }
    else {
      this.route.navigate(['login']);
    }
  }
}


export class User {
  user_id	: string;
  login: string;
  admin: number;
}
