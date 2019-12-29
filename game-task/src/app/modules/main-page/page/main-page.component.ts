import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayingFieldComponent} from "../components/playing-field/playing-field.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild(PlayingFieldComponent, {static: false}) child: PlayingFieldComponent;

  ngOnInit(): void {
  }

  public setGameMode(gameMode) {
    this.child.setGameMode(gameMode)
  }

  public startGameHandler() {
    this.child.startGame();
  }
}
