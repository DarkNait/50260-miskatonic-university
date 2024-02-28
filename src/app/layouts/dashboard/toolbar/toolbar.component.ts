import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../pages/users/model/user';
import { selectAuthUser } from '../../../core/store/auth/selectors/selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output()
  sidebarOpenedEvEmmiter = new EventEmitter<boolean>();

  authUser$: Observable<User | null>;
  sidebarOpened : boolean = true;

  constructor(private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser)
  }

  sidenavToggle = () => {
    this.sidebarOpened = !this.sidebarOpened;
    this.sidebarOpenedEvEmmiter.emit(this.sidebarOpened);
  }
}
