import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GameModeService} from "../../services/game-mode.service";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {

  @Output() gameMode: EventEmitter<any> = new EventEmitter();
  @Output() startGame: EventEmitter<any> = new EventEmitter();

  modes = [];
  dropDownValues = [];
  gameModeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private gameModeService: GameModeService) {
  }

  ngOnInit() {
    this.initGameForm();
    this.getGameModes();
  }

  private initGameForm() {
    this.gameModeForm = this.formBuilder.group({
      gameMode: null,
      name: null
    })
  }

  private getGameModes() {
    this.gameModeService.getGameModesFromServer().subscribe((res) => {
      for (let key in res) {
        this.modes.push(res[key]);
        this.dropDownValues.push(key);
      }
      this.dropDownValues = this.dropDownValues.map((item, i) => {
        return {id: i, name: item}
      })
    })
  }

  public setGameMode(modeId: number) {
    const modeName = this.gameModeForm.get('gameMode').value;
    this.gameMode.emit({selected: this.modes[modeId], modeName: modeName.name})
  }

  public startGameHandler() {
    this.startGame.emit();
  }
}
