import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  aboutThis() {
    setInterval(() => document.querySelector('#my-about').innerHTML += (Math.floor(Math.random() * 2)), 100);

  }
}
