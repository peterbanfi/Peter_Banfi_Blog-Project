import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-blogger',
  templateUrl: './blogger.component.pug',
  styleUrls: ['./blogger.component.css']
})
export class BloggerComponent implements OnInit {
  adat: object = {
    _id: "",
    userName: "",
    email: "",
    password: "",
    posts: ""
  }
  modal: object = {
    _id: "",
    userName: "",
    email: "",
    password: "",
    posts: ""
  }
  datas: any;
  posts: any;

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
    this.http.get('http://localhost:8080/user/getAll').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  /*   create() {
      this.http.post('localhost:8080/user/getAll', this.adat).subscribe(
        data => {
          this.errorHandling(data);
        });
    } */

  update() {
    this.http.put(`http://localhost:8080/user/update/${this.modal['_id']}`, this.modal)
      .subscribe(data => {
        this.errorHandling(data);
      });
    location.reload();
    /*     this.http.get(`http://localhost:8080/user/getOne/${id}`)
          .subscribe(data => {
            this.errorHandling(data);
          }); */
  }

  modalChange(id) {
    let choosen = this.datas.filter(item => item._id == id)[0];
    this.modal = Object.assign({}, choosen);
  }

  deleteRow(id) {
    if (confirm(`Are you sure to delete ${id}?`)) {
      this.http.delete(`http://localhost:8080/user/remove/${id}`)
        .subscribe(data => {
          this.errorHandling(data);
        });
      location.reload();
    }
  }

}
