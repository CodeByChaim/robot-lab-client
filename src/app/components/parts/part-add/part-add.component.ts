import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PartsService} from '../parts.service';
import {Part} from '../../../models/part.model';

@Component({
  selector: 'app-part-add',
  template: `
    <div class="parts-container">
      <div *ngIf="part" class="part-card">
        <div>
          <img class="part-img" src="/assets/images/cpu.png"/>
          <label>Name:
            <input placeholder="Part's name" [(ngModel)]="part.name"/>
          </label>
        </div>
        <div>
          <label>CPU:
            <input placeholder="CPU" [(ngModel)]="part.cpu"/>
          </label>
        </div>
        <div>
          <label>Engine:
            <input placeholder="Engine" [(ngModel)]="part.engine"/>
          </label>
        </div>
        <div>
          <label>Type:
            <input placeholder="Part's type" [(ngModel)]="part.type"/>
          </label>
        </div>
        <div class="btn-container">
          <i class="material-icons update" title="submit" (click)="save()">check_circle</i>
          <i class="material-icons cancel" title="cancel" (click)="goBack()">cancel</i>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../part-details/part-details.component.scss']
})
export class AddPartComponent implements OnInit {

  part: Part;

  constructor(
    private partsService: PartsService,
    private location: Location) {
    this.part = new Part();
  }

  ngOnInit() {
  }

  save(): void {
    this.partsService.addPart(this.part)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
