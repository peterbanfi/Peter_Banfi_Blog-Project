import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { version } from 'punycode';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.pug',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  adat: object = {
    id: "",
    userName: "",
    email: "",
    password: "",
  }
  /* modal: object = {
    id: "",
    userName: "",
    email: "",
    password: "",
  } */
  datas: any;
  constructor(public http: Http) {
    this.getAll();
  }

  ngOnInit() {
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

  create() {
    let forValidEmail = document.getElementById('validationCustom01').className;
    let forValidPass = document.getElementById('validationCustom02').className;
    let forValidName = document.getElementById('validationCustomUsername').className;
    let verify1 = forValidEmail.includes("ng-valid");
    let verify2 = forValidName.includes("ng-valid");
    let verify3 = forValidPass.includes("ng-valid");
    let validFeed = document.getElementsByClassName('valid-feedback') as HTMLCollectionOf<HTMLElement>;
    console.log(verify1, verify2, verify3);
    if (verify1 === true && verify2 === true && verify3 === true) {
      this.http.post('http://localhost:3000/blog/', this.adat).subscribe(
        data => {
          this.errorHandling(data);
        });
      //valamiféle validáláshoz, de az elementtel va baja
      //document.querySelector('.valid-feedback').style.display = "block";
      console.log(this.adat);
      console.log('Thank you! You can log in now!');
    } else {
      event.preventDefault();
      event.stopPropagation();
      console.log('Not valid data.');
    }

    /*    window.addEventListener('load', function () {
         // Fetch all the forms we want to apply custom Bootstrap validation styles to
         var forms = document.getElementsByClassName('needs-validation');
         // Loop over them and prevent submission
         var validation = Array.prototype.filter.call(forms, function (form) {
           form.addEventListener('submit', function (event) {
             if (form.checkValidity() === false) {
               event.preventDefault();
               event.stopPropagation();
             }
             form.classList.add('was-validated');
             alert('Thank you! You can log in now!');
           }, false);
         });
       }, false);
     }; */
  }
}
