import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameModeService {

  private gameModeUrl = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

  constructor(private http: HttpClient) { }

  getGameModesFromServer() {
    return this.http.get<any>(this.gameModeUrl);
  }
}
