import {Component} from '@angular/core';


@Component({
    selector: 'about',
    styles: [`
      .about-header {
        text-align: center;
        margin-bottom: 15px;
      }
    `],
    template: `
      <h4 class='about-header'>О системе</h4>
    `,
})
export class AboutComponent{
  
}
