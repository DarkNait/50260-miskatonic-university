import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() 
  sidenavOpened : boolean;

  constructor() {
    this.sidenavOpened = true;
  }

}
