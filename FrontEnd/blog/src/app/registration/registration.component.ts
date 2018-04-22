import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { Router } from "@angular/router";
import { EmailValidator } from '@angular/forms';
import 'rxjs/Rx';


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
    this.validation();
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
      })

    //this.http.post('http://localhost:8080/user/register', this.adat).map(res => res.json());

    alert('Thank you! You can log in now!');
    this.router.navigate(['home']);
  }

  validation() {
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      let validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);


  }
}
