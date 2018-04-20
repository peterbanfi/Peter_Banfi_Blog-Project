import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.pug',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  adat: object = {
    username: "",
    email: "",
    password: "",
  }
  datas: any;
  constructor(public http: Http, private router: Router) {
    this.getAll();
  }

  ngOnInit() {
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
      return true;
    }
    else {
      this.datas = res;
      return false;
    }
  }

  getAll() {
    this.http.get('http://localhost:8080/user/').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  create() {
    let forValidEmail = document.getElementById('validationCustom01').className;
    let forValidPass = document.getElementById('validationCustom02').className;
    let forValidName = document.getElementById('validationCustomUsername').className;
    let verify1 = forValidEmail.includes("ng-valid");
    let verify2 = forValidName.includes("ng-valid");
    let verify3 = forValidPass.includes("ng-valid");
    let validFeed = document.getElementsByClassName('valid-feedback') as HTMLCollectionOf<HTMLElement>;
    let element = document.getElementById('hOne');
    let regName = document.getElementById('validationCustomUsername') as HTMLInputElement;
    let regEmail = document.getElementById('validationCustom01') as HTMLInputElement;
    let regPass = document.getElementById('validationCustom02') as HTMLInputElement;
    this.adat = {
      username: regName.value,
      email: regEmail.value,
      password: regPass.value
    }
    this.http.post('http://localhost:8080/user/register', this.adat).subscribe(
      data => {
        this.errorHandling(data);
      });

    if (!this.errorHandling) {
      console.log(this.adat);
      console.log(verify1, verify2, verify3);
      alert('Thank you! You can log in now!');
      this.router.navigate(['home']);
    } else {
      alert('Not valid data.');
    }
  }
}
