import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
    /*
    RouterModule.forChild([
      {
        // /home
        path: 'login',
        loadChildren: () =>
          import('./auth.module').then((m) => m.AuthModule),
      }
    ]),    
    */
  ]
})
export class AuthModule { }
