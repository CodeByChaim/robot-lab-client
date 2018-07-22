import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RobotListComponent} from './components/robots/robot-list/robot-list.component';
import {PartListComponent} from './components/parts/part-list/part-list.component';
import {PartDetailsComponent} from './components/parts/part-details/part-details.component';
import {RobotDetailsComponent} from './components/robots/robot-details/robot-details.component';
import {AddRobotComponent} from './components/robots/robot-add/robot-add.component';
import {AddPartComponent} from './components/parts/part-add/part-add.component';

const routes: Routes = [
  {path: '', redirectTo: '/robots', pathMatch: 'full'},
  {
    path: 'robots', children: [
      {path: '', component: RobotListComponent},
      {path: 'add', component: AddRobotComponent}
    ]
  },
  {path: 'robots/:id', component: RobotDetailsComponent},

  {
    path: 'parts', children: [
      {path: '', component: PartListComponent},
      {path: 'add', component: AddPartComponent}
    ]
  },
  {path: 'parts/:id', component: PartDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
