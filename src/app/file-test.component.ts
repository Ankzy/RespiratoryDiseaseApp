import {Component, OnInit} from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpService } from './http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {SystemInfo} from './supporting';



@Component({
    selector: 'registration',
    styles: [`
      

    `],
    template: `
      
      <!--<h1>Upload file test</h1>-->
<!--<div>-->
    <!--<form [formGroup] = "uploadForm" (ngSubmit)="onSubmit()">      -->
      <!--<div>-->
        <!--<input type="file" name="profile" (change)="onFileSelect($event)" />-->
      <!--</div>-->
      <!--<div>-->
        <!--<button type="submit">Upload</button>-->
      <!--</div>-->
    <!--</form>-->
  <!---->
 <!--<h1>-->
  <!--{{title}}-->
<!--</h1>-->

  <form>
    <div>
      <input class="form-control" type='file' (change)='convertFile(input)' id='fileInput' #input>
    </div>
    <div>
      <button type="submit" (click)="submitCSV()">Загрузить</button>
    </div>
  </form>
  


      
      


      `,
  providers: [HttpService]
})

export class FileTestComponent implements OnInit {

  err_code: string;
  title = 'csvTOjson works!';
  text  : any ;
  JSONData : any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {

  }

  submitCSV() {

    const body = {command: 'load_csv', args: {file: this.JSONData}};
    this.httpService.postRequest(SystemInfo.systemUrl, body).subscribe((data: any) => {
      this.err_code = data.body['error_code'];
      console.log(this.err_code)
    });

  }

  csvJSON(csvText) {

    var lines = csvText.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    console.log(headers);
    for (var i = 1; i < lines.length-1; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    console.log(JSON.stringify(result)); //JSON
    this.JSONData = JSON.stringify(result);

  }


  convertFile(input) {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let text = reader.result;
      this.text = text;
      console.log(text);
      this.csvJSON(text);
    };
  }
}
