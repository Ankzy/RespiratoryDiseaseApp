import { Component} from '@angular/core';
import { NgForm} from '@angular/forms';
import {HttpClient, HttpRequest} from '../../node_modules/@angular/common/http';
import {Router} from '@angular/router';
import {HttpHeaders} from '../../node_modules/@angular/common/http';


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
      </div>`
})



export class LoginComponent{

  static readCookie(name: string): any {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  constructor(private http: HttpClient, private route: Router){}

  submit(form: NgForm) {
    const body = {'command': 'login', 'args': form.value};
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
      observe: 'response' as 'response',
      credentials: 'include',
      responseType: 'json'
    };

    this.http.post('http://localhost:8080/login', body, httpOptions).subscribe((data: any) => {
      console.log(data);
      console.log(data.headers.keys());
      console.log(data.body['error_code']);
      console.log(document.cookie);
      if (data.body['error_code'] == 0) {
        const userLogin = LoginComponent.readCookie('user');
        console.log(userLogin);
        this.route.navigate(['admin']);
      }
    });

    // console.log(this.http.post('http://localhost:8080/login', body, httpOptions));

    // if (data.body['error_code']==0) {
    //   this.route.navigate(['admin']);
    // }

// public signinUser(user:UserSigninInfo):any{
    // console.log('contacting server at '+this.API_URL +this.SIGNIN_USER_URL +" with user data "+user+ " with httpOptions "+httpOptions.withCredentials + ","+httpOptions.headers );

    // let signinInfo = new UserSignin(user);
    // let body = JSON.stringify(signinInfo);
  //   return this.http.post(this.SIGNIN_USER_URL, body, httpOptions)
  //     .catch(this.handleError);
  // }




    // let headers = new HttpHeaders();
    // const myHeaders = new HttpHeaders().set('Authorization', 'my-auth-token');
    // myHeaders.set("Access-Control-Allow-Credentials", "true");
    //
    // headers.append('Access-Control-Allow-Credentials', "true");
    // this.http.post('http://localhost:8080/login', body,{headers: myHeaders, observe: 'response' as 'body', responseType: "json"}).subscribe((data:any) => {
    //   console.log(data.headers.keys());
    //   console.log(data.body['error_code']);
    //   if (data.body['error_code']==0) {
    //     this.route.navigate(['admin']);
    //   }
    // });

  }
}
