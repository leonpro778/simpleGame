import { Component } from '@angular/core';
import * as config from '../config/config';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})

export class TitleComponent {
  gameTitle = config.gameTitle;
}
