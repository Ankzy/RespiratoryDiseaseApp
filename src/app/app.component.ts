import { Component} from '@angular/core';
import {Router} from '@angular/router';

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
          margin-left: 30px;
        }

        hr {
          background-color: black;
          opacity: 0.6;
          height: 1px;
          border: none;
          width: 1490px;
          margin-left: 20px;

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
                      <a *ngIf="router.url!=='/'" class="nav-link" routerLink="">Predict state</a>
                    </li>
                    <li class="nav-item">
                      <a *ngIf="router.url==='/'" class="nav-link" routerLink="/admin">Administration</a>
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
  constructor(public router: Router) {}
}
