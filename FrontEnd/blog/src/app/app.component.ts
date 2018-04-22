import { Component } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
import { Router } from "@angular/router";
import { HostListener } from "@angular/core";
import 'rxjs/Rx';


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
  scrollPos: number;
  logged: boolean = false;



  constructor(public http: Http, private router: Router) {
    this.getAll();
    this.validation();
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
    this.datas = this.http.get('http://localhost:8080/user/').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  signIn() {
    let logName = document.getElementById('logName') as HTMLInputElement;
    let logPass = document.getElementById('logPass') as HTMLInputElement;
    let hello = document.getElementById('user') as HTMLInputElement;
    this.adat = {
      username: logName.value,
      password: logPass.value
    }
    if (logName.value == "" || logPass.value == "") {
      alert('Wrong E-mail or Password!');
    }
    else {
      if (this.logged == true) {
        alert('You already logged in!');
      } else {
        this.http.post('http://localhost:8080/user/login', this.adat).subscribe(
          data => {

            let enter = '{"succes":"Login"}';
            let goAway = "Unauthorized";
            if (data['_body'] == enter) {
              this.router.navigate(['blog']);
              console.log('enter!');
              hello.innerHTML = `Hello, ${logName.value}!`;
              this.logged = true;
              //});

            } else {
              this.errorHandling(data);
              alert('You already logged in!');
            };
            //console.log(data['_body']);

          });

      }
    }
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
          return true;
        }, false);
      });
    }, false);
  }

  //transparent navbar
  @HostListener('window:scroll') onScroll() {
    let navbar = document.querySelector('.bg-dark-custom') as HTMLElement
    this.scrollPos = document.documentElement.scrollTop;
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
      navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.6)';
    } else {
      navbar.style.backgroundColor = '#343A40';
    }
  };
  //listening scroll pos
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    let navbar = document.querySelector('.bg-dark-custom') as HTMLElement
    if (this.scrollPos > 60) {
      if (event.clientY <= 60) {
        navbar.style.backgroundColor = '#343A40';
      } else {
        navbar.style.backgroundColor = 'rgba(52, 58, 64, 0.6)';
      }
    }

  }

  //Scrolling back to the top
  backToTop() {
    if (document.documentElement.scrollTop > 800) {
      setTimeout(() => {
        document.documentElement.scrollTop = document.documentElement.scrollTop - 126;
        this.backToTop();
      }, 10)
    } else if (document.documentElement.scrollTop > 400) {
      setTimeout(() => {
        document.documentElement.scrollTop = document.documentElement.scrollTop - 26;
        this.backToTop();
      }, 10)
    } else if (document.documentElement.scrollTop > 0) {
      setTimeout(() => {
        document.documentElement.scrollTop = document.documentElement.scrollTop - 10;
        this.backToTop();
      }, 10)
    }

    else {
      return;
    }
  }

}
