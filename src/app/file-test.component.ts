import {Component, OnInit} from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpService } from './http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
    selector: 'registration',
    styles: [`
      

    `],
    template: `
      
      <h1>Upload file test</h1>
<div>
    <form [formGroup] = "uploadForm" (ngSubmit)="onSubmit()">      
      <div>
        <input type="file" name="profile" (change)="onFileSelect($event)" />
      </div>
      <div>
        <button type="submit">Upload</button>
      </div>
    </form>
  </div>


      `,
  providers: [HttpService]
})

export class FileTestComponent implements OnInit {

  SERVER_URL = "http://localhost:8080";
  uploadForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }



}
