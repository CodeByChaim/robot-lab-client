import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PartsService} from '../parts.service';
import {Part} from '../../../models/part.model';

@Component({
  selector: 'app-part-details',
  template: `
    <div class="parts-container">
      <div class="part-card">
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
  styleUrls: ['./part-details.component.scss']
})
export class PartDetailsComponent implements OnInit {

  part: Part = new Part();

  constructor(
    private route: ActivatedRoute,
    private partsService: PartsService,
    private location: Location) {
  }

  ngOnInit() {
    this.getPart();
  }

  getPart(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.partsService.getPartById(id)
      .subscribe(part => {
        this.part = part;
        console.log('Part: ', this.part);
      });
  }

  save(): void {
    console.log('save Part: ', this.part);
    this.partsService.updatePart(this.part)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
