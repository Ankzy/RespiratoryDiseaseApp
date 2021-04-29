import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpService } from './http.service';
import { SystemInfo } from './supporting';

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
        /*background-color: #e3f2fd;*/
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
      .selects {
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
                  <input class='inputs' name="password" type="text" placeholder="Пароль" ngModel required>
                  <input class='inputs' name="password_confirm" type="text" placeholder="Подтверждение пароля" ngModel required>
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

  constructor(private httpService: HttpService){}

  submit(form: NgForm): any{
    const body = {command: 'register', args: form.value};
    this.httpService.postRequest(SystemInfo.registrationUrl, body).subscribe((data: any) => {
      console.log(data.body['error_code']);
    });
  }

}
