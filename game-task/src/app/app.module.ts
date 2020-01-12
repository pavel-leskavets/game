import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {DropdownModule} from 'primeng/dropdown';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./modules/home-page/home-page.component";
import {MainPageComponent} from "./modules/main-page/page/main-page.component";
import {AppComponent} from "./components/app/app.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { GameSettingsComponent } from './modules/main-page/components/game-settings/game-settings.component';
import { PlayingFieldComponent } from './modules/main-page/components/playing-field/playing-field.component';
import { LeaderBoardComponent } from './modules/main-page/components/leader-board/leader-board.component';
import {TableModule} from "primeng";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'main-page', component: MainPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainPageComponent,
    GameSettingsComponent,
    PlayingFieldComponent,
    LeaderBoardComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        DropdownModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        TableModule
    ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
