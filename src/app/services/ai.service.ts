import { Injectable } from '@angular/core';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})

export class AiService {
  private lastComputerMove = '';

  getLastComputerMove() {
    return this.lastComputerMove;
  }

  setLastComputerMove(idElement) {
    this.lastComputerMove = idElement;
  }

  computerMove(idElement, gameTable: TableService) {
    let maxValue = 0;
    let checkLine;
    let elementValue;
    const rowLine = idElement.substr(0, 1);
    const colLine = idElement.substr(1, 1);

    console.log(rowLine + ' ; ' + colLine);

    for(checkLine=1; checkLine<=9; checkLine++) {
      elementValue = parseInt(gameTable.getGameTable()[checkLine.toString() + colLine.toString()], 10);
      if (elementValue > maxValue) {
        maxValue = elementValue;
        this.lastComputerMove = checkLine.toString() + colLine.toString();
      }
    }

    for(checkLine=1; checkLine<=9; checkLine++) {
      elementValue = parseInt(gameTable.getGameTable()[rowLine.toString() + checkLine], 10);
      if (elementValue > maxValue) {
        maxValue = elementValue;
        this.lastComputerMove = rowLine.toString() + checkLine.toString();
      }
    }

    if (maxValue > 0) {
      gameTable.blockField(this.lastComputerMove);
    }

    console.log(this.lastComputerMove);
    return maxValue;
  }
}
