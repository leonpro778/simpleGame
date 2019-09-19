import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TableService {
  private gameTable: string[] = [];

  getGameTable() {
    return this.gameTable;
  }

  fillTable() {
    this.gameTable.forEach((value, key) => {
      document.getElementById(key.toString()).innerText = value;
      document.getElementById(key.toString()).className = 'field-table';
      document.getElementById(key.toString()).classList.add('field-table-in-game');
    });
  }

  initializeTable() {
    /*
      This method initialize game table. Each field is fill by te value from 1 to 9. One value can by only ONE at the same line,
      horizontal nor vertical. The size of game table is 9x9.
     */

    /*
      x and y are variables which defines width and height of our game table. This variables is also used to fill map which contains
      all fields (f.e.: key => '11' means filed which div id is 11)
     */
    let x;
    let y;
    let elementList;
    let elementIndex;
    let fieldIndex;

    for(y=1; y<=9; y++) {
      elementList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for(x=1; x<=9; x++) {
        fieldIndex = y.toString() + x.toString();
        elementIndex = Math.floor(Math.random()*elementList.length);
        this.gameTable[fieldIndex.toString()] = elementList[elementIndex];
        elementList.splice(elementIndex, 1);
      }
    }
  }

  cleanTable() {
    this.gameTable.forEach((value, key) => {
      document.getElementById(key.toString()).className = 'field-table';
      document.getElementById(key.toString()).innerHTML = '0';
    });
  }

  blockField(idElement) {
    document.getElementById(idElement).classList.add('field-block');
    this.gameTable[idElement] = '0';
    document.getElementById(idElement).innerHTML = this.gameTable[idElement];
  }

  showAvailableMoves(idElement) {
    const rowLine = idElement.substr(0, 1);
    const colLine = idElement.substr(1, 1);
    let line;
    let fieldId;
    for(line=1; line<=9; line++) {
      fieldId = rowLine.toString() + line.toString();
      if (parseInt(this.gameTable[fieldId], 10) > 0) {
        document.getElementById(fieldId).classList.add('field-available-move');
      }
    }
    for(line=1; line<=9; line++) {
      fieldId = line.toString() + colLine.toString();
      if (parseInt(this.gameTable[fieldId], 10) > 0) {
        document.getElementById(fieldId).classList.add('field-available-move');
      }
    }
    document.getElementById(idElement).classList.remove('field-available-move');
  }

  removeAvailableMoves(idElement) {
    const rowLine = idElement.substr(0, 1);
    const colLine = idElement.substr(1, 1);
    let line;
    let fieldId = '';
    let fieldBlock;
    for(line=1; line<=9; line++) {
      fieldId = rowLine.toString() + line.toString();
      fieldBlock = document.getElementById(fieldId);
      if (fieldBlock.classList.contains('field-available-move')) { fieldBlock.classList.remove('field-available-move'); }
    }
    for(line=1; line<=9; line++) {
      fieldId = line.toString() + colLine.toString();
      fieldBlock = document.getElementById(fieldId);
      if (fieldBlock.classList.contains('field-available-move')) { fieldBlock.classList.remove('field-available-move'); }
    }
  }
}
