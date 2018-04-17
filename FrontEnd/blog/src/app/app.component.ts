import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  adat: object = {
    id: "",
    userName: "",
    email: "",
    password: "",
  }
  modal: object = {
    id: "",
    userName: "",
    email: "",
    password: "",
  }
  datas: any;


  constructor(public http: Http) {
    this.getAll();
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    }
    else {
      this.datas = res;
    }
  }

  getAll() {
    this.http.get('http://localhost:3000/blog').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  update() {
    this.http.put(`http://localhost:3000/blog/${this.modal['id']}`, this.modal)
      .subscribe(data => {
        this.errorHandling(data);
      });
  }
}
