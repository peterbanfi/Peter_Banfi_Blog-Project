import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
import { Router } from "@angular/router";


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
  datas: any;
  users: any;



  constructor(public http: Http, private router: Router) {
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
    this.datas = this.http.get('http://localhost:3000/blog').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  signIn() {
    let logName = document.getElementById('logName') as HTMLInputElement;
    let logPass = document.getElementById('logPass') as HTMLInputElement;
    let hello = document.getElementById('user') as HTMLInputElement;
    console.log(this.datas, logName.value, logPass.value);
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].userName === logName.value && this.datas[i].password === logPass.value) {
        console.log('Access granted!');
        this.router.navigate(['blog']);
        hello.innerHTML = `Hello, ${this.datas[i].userName}!`;
        return;
      } else {
        console.log('Wrong username or password!');
      }

    }
  }
}
