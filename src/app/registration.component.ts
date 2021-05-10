import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpService } from './http.service';
import {CookieManager, SystemInfo} from './supporting';
import {Router} from '@angular/router';

@Component({
    selector: 'registration',
    styles: [`
      .reg-header {
        text-align: center;
        margin-bottom: 25px;
      }
      .predict-div {
        width: 1500px;
        margin: 0 auto;
        padding-top: 10px;
        text-align: center;
        border-radius: 23px;
      }
      .add-data{
        margin-top: 4px;
        
      }
      .ft-name {
        float: left;
        margin-left: 20px;
        margin-top: 4px;
      }

      .inputs {
        margin-left: 80px;
        width: 210px;
        border-radius: 8px;
        margin-top: 4px;
      }
      .submit-button {
          border-radius: 16px;
          width: 180px;
          margin: 15px;
      }
      

    `],
    template: `
      <h4 class='reg-header'>Регистрация</h4>
      <div class='predict-div'>
        <form #myForm="ngForm">
          <div class='add-data'>
            <div class="container">
              <div class="row">
                <div class="col-4"></div>
                <div class="col-1">
                  <div class="ft-name">Логин</div>
                  <div class="ft-name">Пароль</div>
                  <div class="ft-name">Подтверждение</div>
                </div>
                <div class="col-2">
                  <input class='inputs' name="login" type="text" placeholder="Логин" ngModel required>
                  <input class='inputs' name="password" type="password" placeholder="Пароль" ngModel required>
                  <input class='inputs' name="password_confirm" type="password" placeholder="Подтверждение пароля" ngModel required>
                </div>
              </div>
            </div>
          </div>
          <button class='submit-button' (click)="submit(myForm)" type="submit" [disabled]="myForm.invalid">Зарегистрироваться</button>
        </form>
      </div>`,
  providers: [HttpService]
})

export class RegistrationComponent{

  constructor(private httpService: HttpService, private route: Router){}

  submit(form: NgForm): any{
    const body = {command: 'register', args: form.value};
    this.httpService.postRequest(SystemInfo.registrationUrl, body).subscribe((data: any) => {
      if (data.body['error_code'] === 0) {
        this.route.navigate(['']);
      }
      else if (data.body['error_code'] === 610) {
        alert('Введенный вами логин уже существует.')
      }
      else if (data.body['error_code'] === 611) {
        alert('Введеные пароли не совпадают.')
      }
    });
  }

}
