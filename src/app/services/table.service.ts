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

  shuffleArray(someArray) {
    let i;
    let j;
    let x;
    for (i = someArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = someArray[i];
      someArray[i] = someArray[j];
      someArray[j] = x;
    }
    return someArray;
  }

  getFromToPair(max) {
    let pair = [];
    let firstValue;
    let secondValue;

    while(true) {
      firstValue = Math.ceil(Math.random() * max);
      secondValue = Math.ceil(Math.random() * max);
      pair.push(firstValue);
      pair.push(secondValue);
      if ( firstValue !== secondValue) { break; }
      pair = [];
    }
    return pair;
  }

  changeColumns(from, to) {
    let idFieldFrom;
    let idFieldTo;
    let tempValue;
    let y;

    // change values
    for (y = 1; y <= 9; y++) {
      idFieldFrom = y.toString() + from.toString();
      idFieldTo = y.toString() + to.toString();
      tempValue = this.gameTable[idFieldFrom];
      this.gameTable[idFieldFrom] = this.gameTable[idFieldTo];
      this.gameTable[idFieldTo] = tempValue;
    }
  }

  changeRows(from, to) {
    let idFieldFrom;
    let idFieldTo;
    let tempValue;
    let x;

    // change values
    for (x = 1; x <= 9; x++) {
      idFieldFrom = from.toString() + x.toString();
      idFieldTo = to.toString() + x.toString();
      tempValue = this.gameTable[idFieldFrom];
      this.gameTable[idFieldFrom] = this.gameTable[idFieldTo];
      this.gameTable[idFieldTo] = tempValue;
    }
  }

  setTableElements() {
    let x;
    let y;
    let firstRow;
    let nextRow;
    let idField;
    let newArray = [];
    let startElements = [];
    let endElements = [];

    firstRow = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    nextRow = firstRow.slice();

    // fill table, next row have to moved first element to second, second to third etc.
    for (y = 1; y<=9; y++) {
      console.log(y + ' line: ' + nextRow);
      for (x = 1; x <= 9; x++) {
        idField = y.toString() + x.toString();
        this.gameTable[idField] = nextRow[(x-1)];
      }

      // move elements to the right
      newArray = [];
      endElements = nextRow.slice(0, -1);
      startElements = nextRow[8];
      newArray.push(startElements);
      nextRow = newArray.concat(endElements);
    }
  }

  shuffleTable() {
    const numOfDraws = 10;
    let pair = [];
    let i;

    for (i = 1; i <= numOfDraws; i++) {
      pair = this.getFromToPair(9);
      this.changeColumns(pair[0], pair[1]);

      pair = this.getFromToPair(9);
      this.changeRows(pair[0], pair[1]);
    }
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
    this.setTableElements();
    this.shuffleTable();
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
