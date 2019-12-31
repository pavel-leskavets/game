import {Component, OnInit} from '@angular/core';
import {GameMode} from '../../models/game-mode';
import {Messages} from '../../../../../assets/enums/messages.enum';
import {StyleClasses} from '../../../../../assets/enums/style-classes.enum';

@Component({
    selector: 'app-playing-field',
    templateUrl: './playing-field.component.html',
    styleUrls: ['./playing-field.component.css']
})
export class PlayingFieldComponent implements OnInit {

    gameMode: GameMode;
    fieldClass: string;
    winner: string;
    playingFieldArray = [];

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
        let prevCell;
        const clearCells: NodeList = document.querySelectorAll(StyleClasses.ClearCell);
        const clearCellsArray = Array.prototype.slice.call(clearCells);
        this.clearField(clearCells);
        const gameInterval = setInterval(() => {
            this.removeActiveClass(prevCell);
            this.isPlayerClick(prevCell)
            this.winner = this.isGameFinished(clearCells);
            if (this.winner) {
                clearInterval(gameInterval);
                return
            }
            const cellIndex = (Math.floor(Math.random() * (clearCellsArray.length - 1)));
            const activeCell = clearCellsArray[cellIndex];
            activeCell.classList.add(StyleClasses.ActiveCell);
            clearCellsArray.splice(cellIndex, 1);
            prevCell = activeCell
        }, this.gameMode.delay)

    }

    public setColorToActiveCell(eventClassList) {
        if (eventClassList.contains(StyleClasses.ActiveCell)) {
            eventClassList.remove(StyleClasses.ActiveCell);
            eventClassList.add(StyleClasses.PlayerWon);
        }
    }

    private isGameFinished(clearSells: NodeList) {
        const wonPoints = clearSells.length / 2;
        const computerCells = document.querySelectorAll(`.${StyleClasses.ComputerWon}`);
        const playerCells = document.querySelectorAll(`.${StyleClasses.PlayerWon}`);
        return computerCells.length >= wonPoints && computerCells.length > playerCells.length ? Messages.ComputerWonMessage :
            playerCells.length >= wonPoints && playerCells.length > computerCells.length ? Messages.PlayerWonMessage :
                null
    }

    private removeActiveClass(prevCell: HTMLElement) {
        if (prevCell) {
            prevCell.classList.remove(StyleClasses.ActiveCell)
        }
    }

    private isPlayerClick(prevCell: HTMLElement) {
        if (prevCell && !prevCell.classList.contains(StyleClasses.PlayerWon)) {
            prevCell.classList.add(StyleClasses.ComputerWon);
        }
    }

    private clearField(clearCells: NodeList) {
        const clearCellsArray = Array.prototype.slice.call(clearCells);
        clearCellsArray.forEach((item) => item.classList.remove(StyleClasses.PlayerWon, StyleClasses.ComputerWon))
    }
}
