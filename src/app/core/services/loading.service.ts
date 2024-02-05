import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private mainLoadingTriggered$ = new BehaviorSubject<boolean>(false);
  private loadingTriggered$ = new BehaviorSubject<boolean>(false);

  public isMainLoading$ = this.mainLoadingTriggered$.asObservable();
  public isLoading$ = this.loadingTriggered$.asObservable();

  setIsMainLoading(value: boolean): void {
    this.mainLoadingTriggered$.next(value);
  }

  setIsLoading(value: boolean): void {
    this.loadingTriggered$.next(value);
  }
}
