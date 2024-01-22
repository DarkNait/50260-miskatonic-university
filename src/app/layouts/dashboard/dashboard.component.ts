import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  sidenavOpened : boolean = true;

  acceptData(data: boolean) {
    this.sidenavOpened = data;
    console.log(
      "this is the child data displaying in parent component: ",
      this.sidenavOpened
    );
  }

}
