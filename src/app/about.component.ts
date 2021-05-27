import {Component} from '@angular/core';


@Component({
    selector: 'about',
    styles: [`
      .about-header {
        text-align: center;
        margin-bottom: 15px;
      }
      .about-text {
        text-align: center;
        margin-top: 40px;
      }
      .about-img {
        margin-top: 20px;
        width: 1000px;
        border-radius: 23px;
        
      }
      .img-div {
        text-align: center;
      }
    `],
    template: `
      <h4 class='about-header'>О системе</h4>
      <div class='about-text'>Целью данной системы является определение наличия или отстутствия признаков респираторных заболеваний по ЭКГ.</div>
      <div class='img-div'>
        <img class='about-img' src="./assets/about.jpg">
      </div>
    `,
})
export class AboutComponent{

}
