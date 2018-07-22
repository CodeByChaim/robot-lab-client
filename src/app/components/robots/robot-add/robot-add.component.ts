import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {RobotsService} from '../robots.service';
import {Robot} from '../../../models/robot.model';

@Component({
  selector: 'app-add-robot',
  template: `
    <div class="robots-container">
      <div class="robot-card">
        <div>
          <img class="robotic-arm" src="/assets/images/robotic-arm.png"/>
          <label>Name:
            <input placeholder="Robot's name" [(ngModel)]="robot.name"/>
          </label>
        </div>
        <div>
          <label>Age:
            <input placeholder="Age" [(ngModel)]="robot.age"/>
          </label>
        </div>
        <div>
          <label>Type:
            <input placeholder="Robot's type" [(ngModel)]="robot.type"/>
          </label>
        </div>
        <div class="btn-container">
          <i class="material-icons update" title="submit" (click)="save()">check_circle</i>
          <i class="material-icons cancel" title="cancel" (click)="goBack()">cancel</i>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../robot-details/robot-details.component.scss']
})
export class AddRobotComponent implements OnInit {

  robot: Robot;

  constructor(
    private robotsService: RobotsService,
    private location: Location) {
    this.robot = new Robot();
  }

  ngOnInit() {
  }

  save(): void {
    console.log('Robot: ', this.robot);
    this.robotsService.addRobot(this.robot)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
