import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) { }
  
  // players: JSON | undefined;
  // players = this.httpRequest('http://localhost:8080/games/1/players');
  
  httpRequest(url: string) {
    return this.http.get(url);
  }
}
