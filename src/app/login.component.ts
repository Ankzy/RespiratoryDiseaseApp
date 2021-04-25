import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { SystemInfo } from './supporting';

@Component({
    selector: 'login',
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
      <h4 class='user-header'>Прогнозирование заболевания</h4>
      <div class='predict-div'>
        <form #myForm="ngForm">
          <div class='add-data'>
            <div class="container">
              <div class="row">
                <div class="col-3"></div>
                <div class="col-2">
                  <div class="ft-name">Логин</div>
                  <div class="ft-name">Пароль</div>
                  <div class="ft-name">Админ</div>
                </div>
                <div class="col-2">
                  <input class='inputs' name="login" type="text" placeholder="Логин" ngModel required>
                  <input class='inputs' name="password" type="text" placeholder="Пароль" ngModel required>
                  <select class='selects' name="admin" ngModel required>
                    <option value="" disabled selected>Админ</option>
                    <option [ngValue]="1">
                      Да
                    </option>
                    <option [ngValue]="0">
                      Нет
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button class='submit-button' (click)="submit(myForm)" type="submit" [disabled]="myForm.invalid">Отправить форму</button>
        </form>
      </div>`,
  providers: [HttpService]
})


export class LoginComponent{

  constructor(private httpService: HttpService, private route: Router){}

  submit(form: NgForm): any {

    const requestBody = {command: 'login', args: form.value};

    this.httpService.postRequest(SystemInfo.loginUrl, requestBody).subscribe((data: any) => {
      if (data.body['error_code'] === 0) {
        this.route.navigate(['admin']);
      }
    });
  }
}
