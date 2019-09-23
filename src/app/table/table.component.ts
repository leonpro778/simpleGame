import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { TableService } from '../services/table.service';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  tableHeight = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  tableWidth = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    private gameService: GameService,
    private tableService: TableService,
    private aiService: AiService
  ) {}

  clickField(event) {
    let computerPoints;
    if (this.aiService.getLastComputerMove() !== '') { this.tableService.removeAvailableMoves(this.aiService.getLastComputerMove()); }
    if (this.gameService.getGameStatus()) {
      /*
        Game is still active, check is our next click is in correct column or line
       */
      if (this.gameService.isMovePossible(this.aiService.getLastComputerMove(), this.tableService)) {
        /*
          Ok, our click is in correct column or line, looking for possible moves
         */
        const idElement = event.target.attributes.id.nodeValue;
        if (this.gameService.isClickCorrect(idElement, this.aiService.getLastComputerMove())) {
          /*
            Add player points and block clicked field.
           */
          this.gameService.addPlayerPoints(parseInt(this.tableService.getGameTable()[idElement], 10));
          this.tableService.blockField(idElement);

          /*
            Now is computer turn, if computer get 0 points it's mean that is no more correct moves and game is over
           */
          computerPoints = this.aiService.computerMove(idElement, this.tableService);
          if (computerPoints > 0) {
            this.gameService.addComputerPoints(computerPoints);

            if (this.gameService.isMovePossible(this.aiService.getLastComputerMove(), this.tableService)) {
              this.tableService.showAvailableMoves(this.aiService.getLastComputerMove());
              this.tableService.blockField(this.aiService.getLastComputerMove());
            } else {
              /*
                Game over. Last move was made by Computer
              */
              console.log('Game Over! Last move was made by Computer!');
              this.gameService.endGame();
            }
          } else {
            /*
              Game over. Last move was made by Player
             */
            console.log('Game Over! Last move was made by Player');
            this.gameService.endGame();
          }
        } else {
          /*
            Wrong click, somebody has change field class manually. No action needed
           */
          console.log('Wrong click!');
        }
      } else {
        /*
          Game over. Last move was made by Computer
         */
        console.log('Game Over! Last move was made by Computer!');
        this.gameService.endGame();
      }
    }
  }
}
