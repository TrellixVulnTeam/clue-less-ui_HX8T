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
    this.router.navigateByUrl('/game');
  };

  // action on join game
  joinGameButtonClick=() => {
    this.router.navigateByUrl('/game');
  };

  ngOnInit(): void {
  }
  
}
