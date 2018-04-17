import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.pug',
  styleUrls: ['./blogger.component.css']
})
export class BloggerComponent implements OnInit {
  adat: object = {
    text: ""
  }
  datas: any;
  posts: any;
  /*   constructor(public http: Http) {
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
      this.posts = this.http.get('http://localhost:3000/blogger').subscribe(
        data => {
          this.errorHandling(data);
        });
    }
  
    create() {
   
      //if (verify1 === true && verify2 === true && verify3 === true) {
        this.http.post('http://localhost:3000/blogger/', this.adat).subscribe(
          data => {
            this.errorHandling(data);
          });
        //window.location.reload();
        //this.router.navigate(['home']);
  
      //} else {}
    } */

  constructor(public http: Http) {
    this.getAll();
  }
  ngOnInit() { }
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
    this.http.get('http://localhost:3000/blogger').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  create() {
    this.http.post('http://localhost:3000/blogger/', this.adat).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  /*  update() {
     this.http.put(`http://localhost:3000/blogger/${id}`, this.adat)
       .subscribe(data => {
         this.errorHandling(data);
       });
   }
 
   deleteRow(id) {
     this.http.delete(`http://localhost:3000/blogger/${id}`)
       .subscribe(data => {
         this.errorHandling(data);
       });
   } */

}
