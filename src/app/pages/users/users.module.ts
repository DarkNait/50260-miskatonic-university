import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from './users.service';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserModalComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule, 
    InscriptionsModule   
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersService,
    // {
    //   provide: UsersService,
    //   useClass: UsersMockService,
    // },
  ],
})
export class UsersModule { }
