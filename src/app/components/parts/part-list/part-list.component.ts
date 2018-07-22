import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {PartsService} from '../parts.service';
import {Part} from '../../../models/part.model';

@Component({
  selector: 'app-part-list',
  template: `
    <ul class="parts-container">
      <li *ngFor="let part of parts" class="part-card">
        <div>
          <img class="part-img" src="/assets/images/cpu.png"/>
          <label> </label>
        </div>
        <b>{{part.name}}</b>

        <div>
          <label>CPU: </label>{{part.cpu}}
        </div>
        <div>
          <label>Engine: </label>{{part.engine}}
        </div>
        <div>
          <label>Type: </label>{{part.type}}
        </div>
        <div class="btn-container">
          <a routerLink="/parts/{{part.id}}">
            <i class="material-icons" title="edit">edit</i>
          </a>
          <a routerLink="/">
            <i class="material-icons" title="delete" (click)="delete(part)">delete_forever</i>
          </a>
          <a routerLink="/parts/add">
            <i class="material-icons" title="add">library_add</i>
          </a>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent implements OnInit {

  parts: Part[];

  constructor(
    private partsService: PartsService,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.getParts();
  }

  getParts(): void {
    this.partsService.getParts()
      .subscribe(parts => {
        this.parts = parts;
        if (this.parts.length === 0) {
          this.router.navigateByUrl('/parts/add');
        }
      });
  }

  delete(part: Part): void {
    this.partsService.removePart(part.id)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
