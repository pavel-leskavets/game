import {Component, OnInit, ViewChild} from '@angular/core';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-playing-field',
  templateUrl: './playing-field.component.html',
  styleUrls: ['./playing-field.component.css']
})
export class PlayingFieldComponent implements OnInit {

  gameMode: any;
  fieldClass: string;
  playingFieldArray = [];
  winner: string;


  constructor() {
  }

  ngOnInit() {
  }

  public setGameMode(gameMode) {
    this.gameMode = gameMode.selected;
    this.fieldClass = gameMode.modeName;
    this.playingFieldArray = Array.from({length: this.gameMode.field});
  }

  public startGame() {
    let prev = null;
    const clearCells = document.querySelectorAll('.clear-cell');
    const clearCellsArray = Array.prototype.slice.call(clearCells);
    const gameInterval = setInterval(() => {
      if ( prev && !prev.classList.contains('player-won-cell')) {
        prev.classList.add('computer-won-cell');
      }
      this.winner = this.isGameFinished(clearCells);

      if (this.winner) {
        this.playingFieldArray = [];
        this.playingFieldArray = Array.from({length: this.gameMode.field});

        clearInterval(gameInterval);
        return
      }
      const index = (Math.floor(Math.random() * (clearCellsArray.length - 1)));
      const activeCell = clearCellsArray[index];
      activeCell.classList.add('active-cell');
      clearCellsArray.splice(index, 1);

      prev = activeCell

    }, 10)

  }

  public setColorToActiveCell(event) {
    if (event.target.classList.contains('active-cell')) {
      event.target.classList.remove('active-cell');
      event.target.classList.add('player-won-cell');
    }
  }

  private isGameFinished(clearSells) {
    const wonPoints = clearSells.length / 2;
    const comp = document.querySelectorAll('.computer-won-cell');
    const player = document.querySelectorAll('.player-won-cell');
    console.log(comp.length, player.length)
    return comp.length >= wonPoints && comp.length > player.length ? 'computer won' :
      player.length >= wonPoints && player.length > comp.length ? 'player won' :
        null
  }
}
