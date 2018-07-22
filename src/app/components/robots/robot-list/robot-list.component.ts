import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {RobotsService} from '../robots.service';
import {Robot} from '../../../models/robot.model';

@Component({
  selector: 'app-robot-list',
  template: `
    <ul class="robots-container">
      <li *ngFor="let robot of robots" class="robot-card">
        <div>
          <img src="/assets/images/robotic-arm.png"/>
          <label>
            <b>{{robot.name}}</b>
          </label>
        </div>
        <div>
          <label>Age: </label> {{robot.age}}
        </div>
        <div>
          <label>Type: </label>{{robot.type}}
        </div>
        <div class="btn-container">
          <a routerLink="/robots/{{robot.id}}">
            <i class="material-icons" title="edit">edit</i>
          </a>
          <a routerLink="/">
            <i class="material-icons" title="delete" (click)="delete(robot)">delete_forever</i>
          </a>
          <a routerLink="/robots/add">
            <i class="material-icons" title="add">library_add</i>
          </a>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./robot-list.component.scss']
})
export class RobotListComponent implements OnInit {

  robots: Robot[];

  constructor(
    private robotsService: RobotsService,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.getRobots();
  }

  getRobots(): void {
    this.robotsService.getRobots()
      .subscribe(robots => {
        this.robots = robots;
        if (this.robots.length === 0) {
          this.router.navigateByUrl('/robots/add');
        }
      });
  }

  delete(robot: Robot): void {
    this.robotsService.deleteRobot(robot.id)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
