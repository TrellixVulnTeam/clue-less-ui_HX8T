import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
  }
  
  // action on join game
  createGameButtonClick=() => {
    // TODO: add player to game in backend
    this.router.navigateByUrl('/game');
  };

  // action on join game
  joinGameButtonClick=() => {
    // TODO: create new game in backend
    this.router.navigateByUrl('/game');
  };

  ngOnInit(): void {
  }
  
}
