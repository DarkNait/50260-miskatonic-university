import { Component, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() 
  sidenavOpened : boolean;

  isLoading = false;

  constructor(private loadingService: LoadingService, private authService: AuthService) {
    this.sidenavOpened = true;

    this.loadingService.isLoading$.subscribe({
      next: (v) => {
        setTimeout(() => {
          this.isLoading = v;
        });
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
