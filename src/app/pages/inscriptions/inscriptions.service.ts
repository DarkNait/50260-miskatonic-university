import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { CreateInscriptionData, Inscription } from "./models/inscription";
import { catchError, concatMap, delay, finalize, of, tap, throwError } from "rxjs";
import { AlertService } from "../../core/services/alert.service";
import { LoadingService } from "../../core/services/loading.service";

@Injectable({ providedIn: 'root' })
export class InscriptionsService {

    constructor(private alertService: AlertService, private http: HttpClient, private loadingService: LoadingService) { }

    getInscriptions() {
        this.loadingService.setIsLoading(true);

        return this.http
        .get<Inscription[]>(`${environment.apiURL}/inscriptions?_embed=user&_embed=course`)
        .pipe(
            delay(1000),
            catchError((error) => {
                this.alertService.showError('Error al cargar las inscripciones');
                return of([]);
              }),
            finalize(() => this.loadingService.setIsLoading(false))
        )
    }

    getInscriptionById(id: string | number) {
        return this.http.get<Inscription>(`${environment.apiURL}/inscriptions/${id}`).pipe(          
          catchError((error) => {
            this.alertService.showError('Ocurrio un error al recuperar el usuario.');
            return throwError(() => error);
          })
        );
      }
    
    createInscription(data: CreateInscriptionData) {
        return this.http.post<Inscription>(`${environment.apiURL}/inscriptions`, data);
    }

    updateInscription(data: CreateInscriptionData) {
        return this.http.put<Inscription>(`${environment.apiURL}/inscriptions/${data.id}`, { ...data }); 
    }

    deleteInscription(id: string | number) {
        return this.http
          .delete<Inscription>(`${environment.apiURL}/inscriptions/${id}`)
          .pipe(
            tap(() => this.alertService.showSuccess('Realizado', 'Inscripción eliminada correctamente.')),            
          );    
    }
}