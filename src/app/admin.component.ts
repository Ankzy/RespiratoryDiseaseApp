import { Component} from '@angular/core';

@Component({
    selector: 'admin',
    template: `<nav>
      <a routerLink="change-data">Изменить выборку</a> |
      <a routerLink="learn-model">Обучить модель</a> |
      <a routerLink="models-history">История моделей</a> |
      <a routerLink="set-model">Установить модель</a>
    </nav>
    <router-outlet></router-outlet>`
})
export class AdminComponent{

}
