import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
    {
      // /users
      path: '',
      component: UsersComponent,
    },
    {
      // /users/id
      path: ':id',
      component: UserDetailComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }