import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private notification$ = new Subject<SweetAlertOptions>();
  //private confirm$ = new Subject<SweetAlertOptions>();

  constructor() {
    this.notification$.subscribe({
      next: (options) => {
        Swal.fire(options);
      },
    });

    /*
    this.confirm$.subscribe({
      next: (options, callback) => {
        Swal.fire(options).then((result) => {
          if (result.isConfirmed) {
            if(callback){
              callback();
            }
          }
        });
      },
    });
    */

  }

  showAlert(options: SweetAlertOptions): void {
    this.notification$.next(options);
  }

  showSuccess(title: string, message: string): void {
    this.showAlert({
      icon: 'success',
      title,
      text: message,
    })
  }

  showError(message?: string): void {
    this.showAlert({
      icon: 'error',
      title: 'Error!',
      text: message,
    });
  }

  showConfirm(title: string, message?: string): void {
    let options: SweetAlertOptions = {
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1b5e20;",
      confirmButtonText: "Confirmar",
      cancelButtonColor: "#ddd",      
      cancelButtonText: "Cancelar"
    };
    //this.confirm$.next(options);
  }

}
