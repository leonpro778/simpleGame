import { Injectable } from '@angular/core';
import { TableService } from './table.service';
import {AiService} from './ai.service';
import {version} from '../config/config';
import {config} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private activeGame: boolean;
  private playerScore: number;
  private computerScore: number;
  private modalWindowText: string;
  private modalWindowTitle: string;

  constructor(
    private tableService: TableService,
    private aiService: AiService) {
    this.activeGame = false;
    this.playerScore = 0;
    this.computerScore = 0;
    this.modalWindowText = 'Sample text';
    this.modalWindowTitle = 'Modal window';
  }

  getGameStatus() {
    return this.activeGame;
  }

  getPlayerScore() {
    return this.playerScore;
  }

  getComputerScore() {
    return this.computerScore;
  }

  startGame() {
    this.tableService.initializeTable();
    this.tableService.fillTable();
    this.aiService.setLastComputerMove('');
    this.playerScore = 0;
    this.computerScore = 0;
    this.activeGame = true;
  }

  addPlayerPoints(points: number) {
    this.playerScore += points;
  }

  addComputerPoints(points: number) {
    this.computerScore += points;
  }

  openAbout() {
    this.modalWindowTitle = 'About Simple Game';
    this.modalWindowText = 'Version ' + version + '<br />' +
      'Link on GitHub: <a href="https://github.com/leonpro778/simpleGame">https://github.com/leonpro778/simpleGame</a>' +
      '<br /><br />' +
      '<strong>How to play?</strong><br />' +
      'Collect as many points as possible. Remember that the next move can only be selected from the column or line where the last' +
      'selection was made. The game ends when there are no more possible moves.';
    this.openModal('result');
  }

  abortGame() {
    this.activeGame = false;
    this.playerScore = 0;
    this.computerScore = 0;
    this.tableService.cleanTable();
    this.modalWindowTitle = 'Game aborted';
    this.modalWindowText = 'The game was aborted by <strong>Player</strong>. Sorry, no points...';
    this.openModal('result');
  }

  isClickCorrect(playerMove: string, computerMove: string) {
    const playerMoveY = playerMove.substr(0, 1);
    const playerMoveX = playerMove.substr(1, 1);
    const computerMoveY = computerMove.substr(0, 1);
    const computerMoveX = computerMove.substr(1, 1);

    if ((playerMoveY === computerMoveY) || (playerMoveX === computerMoveX) || (computerMove === '')) {
      return true;
    } else { return false; }
  }

  isMovePossible(idElement, gameTable: TableService) {
    if (idElement !== '') {
      const rowLine = idElement.substr(0, 1);
      const colLine = idElement.substr(1, 1);
      let elementValue;
      let checkLine;

      for(checkLine=1; checkLine<=9; checkLine++) {
        elementValue = parseInt(gameTable.getGameTable()[checkLine.toString() + colLine.toString()], 10);
        if (elementValue > 0) { return true; }
      }

      for(checkLine=1; checkLine<=9; checkLine++) {
        elementValue = parseInt(gameTable.getGameTable()[rowLine.toString() + checkLine], 10);
        if (elementValue > 0) { return true; }
      }

      return false;
    } else {
      return true;
    }
  }

  endGame() {
    this.activeGame = false;
    this.setGameResult();
    this.openModal('result');
  }

  setGameResult() {
    this.modalWindowTitle = 'Game Over';
    this.modalWindowText = 'No more moves!<br /><br />';
    if (this.playerScore > this.computerScore) {
      this.modalWindowText += 'The winner is <strong>PLAYER</strong> with <strong>' + this.playerScore + '</strong> points.<br />' +
        'Computer points: <strong>' + this.computerScore + '</strong><br /><br />';
    } else if (this.playerScore < this.computerScore) {
      this.modalWindowText += 'The winner is <strong>COMPUTER</strong> with <strong>' + this.computerScore + '</strong> points<br />' +
        'Player points: <strong>' + this.playerScore + '</strong><br /><br />';
    } else if (this.playerScore === this.computerScore) {
      this.modalWindowText += '<strong>DRAW !!!</strong><br />Player and Computer has' +
        '<strong>' + this.playerScore + '</strong> points<br /><br />';
    }
    this.modalWindowText += 'Thanks for playing!';
    this.playerScore = 0;
    this.computerScore = 0;
    this.tableService.cleanTable();
  }

  getModalWindowText() {
    return this.modalWindowText;
  }

  getModalWindowTitle() {
    return this.modalWindowTitle;
  }

  openModal(element) {
    document.getElementById(element).style.display = 'block';
  }

  closeModal(element) {
    document.getElementById(element).style.display = 'none';
  }
}
