import {Component, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {CookieManager} from './supporting';

@Component({
    selector: 'admin',
    styles: [`
      .admin-header {
        text-align: center;
        margin-bottom: 15px;
      }

      .admin-menu {
        margin-top: 15px;
        text-align: center;

      }

      .admin-links {
        /*background-color: #4bd299;*/
        /*background-size: 5000px;*/
        width: 290px;
        margin: 10px;
        display: inline-block;
        padding: 4px;
        border-radius: 30px;
        color: black;
        border-style: solid;
        border-width: 2px;
        border-color: black;
        text-decoration: none;
        margin-bottom: 30px;

      }

      .icons {
        width: 50px;
        height: 50px;
        margin-left: 14px;
      }

      .active {
        border-color: #346dff;
        border-style: solid;
        border-width: 2px;
      }

    `],
    template: `
      <h4 class='admin-header'>Администрирование системы</h4>
      <div class="admin-menu">
        
        
        <a class="admin-links" routerLinkActive="active" routerLink="change-data">
          Изменение обучающей выборки
        </a>
        <a class="admin-links" routerLinkActive="active" routerLink="learn-model">
          Обучение новой модели
        </a>
        <a class="admin-links" routerLinkActive="active" routerLink="models-history">
          История обучения моделей
        </a>
        <a class="admin-links" routerLinkActive="active" routerLink="set-model">
          Установка рабочей модели
        </a>
       
      </div>

    <router-outlet></router-outlet>`,
  providers: [HttpService]
})
export class AdminComponent implements OnInit{

  constructor(private httpService: HttpService, private route: Router) {}

  ngOnInit(): any {
    if ((CookieManager.getCookie('user') == '') || (CookieManager.getCookie('admin') == 0)) {
      this.route.navigate(['login']);
    }
  }


}
