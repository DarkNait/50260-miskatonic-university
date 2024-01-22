import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output()
  sidebarOpenedEvEmmiter = new EventEmitter<boolean>();

  sidebarOpened : boolean = true;


  sidenavToggle = () => {
    this.sidebarOpened = !this.sidebarOpened;
    this.sidebarOpenedEvEmmiter.emit(this.sidebarOpened);
  }
}
