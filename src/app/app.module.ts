import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartListComponent } from './components/parts/part-list/part-list.component';
import { RobotListComponent } from './components/robots/robot-list/robot-list.component';
import { HeaderComponent } from './components/header/header.component';
import { PartDetailsComponent } from './components/parts/part-details/part-details.component';
import { RobotDetailsComponent } from './components/robots/robot-details/robot-details.component';
import { AddRobotComponent } from './components/robots/robot-add/robot-add.component';
import { AddPartComponent } from './components/parts/part-add/part-add.component';

@NgModule({
  declarations: [
    AppComponent,
    PartListComponent,
    RobotListComponent,
    HeaderComponent,
    PartDetailsComponent,
    RobotDetailsComponent,
    AddRobotComponent,
    AddPartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
