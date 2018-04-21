import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.pug',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  lat: number = 47.4614391;
  lng: number = 19.05303779999997;
  constructor() {
  }

  ngOnInit() {
  }



}
