import { Component} from '@angular/core';

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
          <!--<img class='icons' src="./assets/1.jpg">-->
          Изменение обучающей выборки
        </a>
        <a class="admin-links" routerLinkActive="active" routerLink="learn-model">
          <!--<img class='icons' src="./assets/3.jpg">-->
          Обучение новой модели
        </a>
        <a class="admin-links" routerLinkActive="active" routerLink="models-history">
          <!--<img class='icons'  src="./assets/4.jpg">-->
          История обучения моделей
        </a>
        <a class="admin-links" routerLinkActive="active" routerLink="set-model">
          <!--<img class='icons' src="./assets/2.jpg">-->
          Установка рабочей модели
        </a>
       
      </div>

    <router-outlet></router-outlet>`
})
export class AdminComponent{

}
