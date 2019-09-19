import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as config from '../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  gameTitle = config.gameTitle;
  version = config.version;
  public constructor(private titleBar: Title) {
    this.titleBar.setTitle(this.gameTitle + ' v.' + this.version);
  }
}
