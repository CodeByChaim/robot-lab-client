import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <h1>
      ROBOT LAB
    </h1>
    <nav>
      <button routerLink="/robots" routerLinkActive="selected">
        Robots
      </button>
      <button routerLink="/parts" routerLinkActive="selected">
        Parts
      </button>
    </nav>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
