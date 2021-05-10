import { Component} from '@angular/core';
import {Router} from '@angular/router';
import {CookieManager} from './supporting';

@Component({
    selector: 'my-app',
    styles: [
      `
        .navbar {
          height: 40px;
        }

        .navbar-brand {
          margin-left: 20px;
        }

        .nav-link {
          color: #346dff !important;
          text-decoration: underline;
        }

        hr {
          background-color: black;
          opacity: 0.6;
          height: 1px;
          border: none;
          width: 1490px;
          margin-left: 20px;

        }  
        .icons {
        margin-left: 10px;
        width: 20px;
        height: 20px;
        margin-bottom: 2px;
       
      }
      `
    ],
    template: `      
      <div>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
          <a class="navbar-brand" routerLink="">Respiratory Disease App</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="container">
              <div class="row">
                <div class='col-10'>
                  
                </div>
                <div class="col-2">
                  <ul class="navbar-nav mr-auto rightnav">
                    <li class="nav-item">
                      <a *ngIf="router.url!=='/'" [hidden]="router.url==='/registration' || router.url==='/login'"  class="nav-link" routerLink="">Пациент</a>
                    </li>
                    <li class="nav-item">
                      <a *ngIf="router.url==='/'" [hidden]="router.url==='/registration' || router.url==='/login' || isAdmin==0" class="nav-link" routerLink="/admin">Администратор</a>
                    </li>
                    <li class="nav-item">
                      <a [hidden]="router.url==='/registration' || router.url==='/login' || isAdmin==0"  class="nav-link" routerLink="/admin/users"><img class="icons" src="./assets/users.png"></a>
                    </li>
                    <li class="nav-item">
                      <a *ngIf="router.url==='/login'" class="nav-link" routerLink="/registration">Регистрация</a>
                    </li>
                    <li class="nav-item">
                      <a *ngIf="router.url==='/registration'" class="nav-link" routerLink="/login">Авторизация</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <hr>
        <router-outlet></router-outlet>
      </div>
    `
})
export class AppComponent {

  isAdmin: number;

  constructor(public router: Router) {
    this.isAdmin = CookieManager.getCookie('admin');
  }
}
