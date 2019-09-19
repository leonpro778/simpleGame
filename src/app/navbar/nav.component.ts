import { Component, OnInit } from '@angular/core';
import * as config from '../config/config';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  private gameButton = 'Start Game';

  constructor(
    private gameService: GameService
  ) {}

  ngOnInit() {
    if (this.gameService.getGameStatus()) { this.gameButton = 'Abort Game'; }
  }

  gameButtonClick() {
    if(this.gameService.getGameStatus()) {
      this.gameButton = 'Start Game';
      this.gameService.abortGame();
    } else {
      this.gameButton = 'Abort Game';
      this.gameService.startGame();
    }
  }

  aboutButtonClick() {
    alert(config.gameTitle + ' version ' + config.version);
  }
}
