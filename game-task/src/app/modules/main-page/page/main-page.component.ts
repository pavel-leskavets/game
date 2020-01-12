import {Component, OnInit, ViewChild} from '@angular/core';
import {PlayingFieldComponent} from "../components/playing-field/playing-field.component";
import {GameSettingsComponent} from "../components/game-settings/game-settings.component";
import {GameModeService} from "../services/game-mode.service";
import {StyleClasses} from "../../../../assets/enums/style-classes.enum";
import {Messages} from "../../../../assets/enums/messages.enum";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild(PlayingFieldComponent, {static: false}) playingField: PlayingFieldComponent;
  @ViewChild(GameSettingsComponent, {static: false}) gameSettings: GameSettingsComponent;

  leadersList: any;
  datePipe: any = new DatePipe("en-US");

  constructor(private gameModeService: GameModeService) {
  }

  ngOnInit(): void {
    this.getLeaders();
  }

  private getLeaders() {
    this.gameModeService.getInitialLeaders().subscribe((res) => {
      this.leadersList = res.reverse().slice(0, 5);
    })
  }

  public setGameMode(gameMode) {
    this.playingField.setGameMode(gameMode)
  }

  public startGameHandler() {
    this.playingField.startGame();
  }

  public updateGameForm(winner: string) {
    this.updateSaveForm();
    if(winner === Messages.ComputerWonMessage) {
      this.gameSettings.winnerForm.get('winner').setValue(Messages.ComputerToTable);
    }
    this.updateLeaderBoard();
  }

  private updateLeaderBoard() {
    const saveForm = this.gameSettings.winnerForm.value;
    this.gameModeService.setWinnerInLeaderBoard(saveForm)
      .subscribe((res) => {
        this.leadersList = res.reverse().slice(0, 5);
      })
  }

  private updateSaveForm() {
    this.gameSettings.winnerForm.patchValue({
      winner: this.gameSettings.gameModeForm.get('name').value,
      date: this.datePipe.transform(new Date(), "medium")
    });
  }
}
