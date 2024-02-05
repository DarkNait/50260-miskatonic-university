import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageContainerComponent } from './page-container/page-container.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { authGuard } from '../../core/guards/auth.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarComponent,
    SidebarComponent,
    PageContainerComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        // /home
        path: 'home',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../../pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        // /users
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../../pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        // /courses
        path: 'courses',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../../pages/courses/courses.module').then((m) => m.CoursesModule),
      },      
      /*{
        path: 'users/:id',
        component: UserDetailComponent,
      },*/
      /*{
        path: '**',
        redirectTo: 'home',
      },*/
    ]),
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
