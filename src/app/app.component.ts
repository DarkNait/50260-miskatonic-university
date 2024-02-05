import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'miskatonicUniversity';

  isMainLoading = false;

  constructor(private loadingService: LoadingService) {    
    this.loadingService.isMainLoading$.subscribe({
      next: (v) => {
        setTimeout(() => {
          this.isMainLoading = v;
        });
      },
    });    
  }
  
  ngOnInit(): void {
    this.loadingService.setIsMainLoading(true);    

    setTimeout(()=> this.loadingService.setIsMainLoading(false), 1500);
  }

}
