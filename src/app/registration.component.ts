import { Component} from '@angular/core';
import { NgForm} from '@angular/forms';
import {HttpClient} from '../../node_modules/@angular/common/http';


@Component({
    selector: 'registration',
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
                  <div class="ft-name">Подтверждение пароля</div>
                </div>
                <div class="col-2">
                  <input class='inputs' name="login" type="text" placeholder="Логин" ngModel required>
                  <input class='inputs' name="password" type="text" placeholder="Пароль" ngModel required>
                  <input class='inputs' name="password_confirm" type="text" placeholder="Подтверждение пароля" ngModel required>
                </div>
              </div>
            </div>
            
            
       
          </div>
          <button class='submit-button' (click)="submit(myForm)" type="submit" [disabled]="myForm.invalid">Отправить форму</button>
        </form>
      </div>`
})
export class RegistrationComponent{


  constructor(private http: HttpClient){

  }

   submit(form: NgForm) {

    const body = {"command": "register", "args": form.value};
    console.log(body);
    this.http.post('http://localhost:8080/registration', body).subscribe((data:any) => {
      console.log(data['error_code'])
    });
   }

}
