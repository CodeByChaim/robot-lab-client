import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">
      <div class="footer-link">
        <a href="https://github.com/chaim10/robot-lab-client"
           target="_blank"
           rel="noopener noreferrer">
          <img src="/assets/images/github32.png" alt="GitHub" width="32px" height="32px"/>
        </a>
        <div class="author">
          <span>Chaim10</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
