import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Inscription } from "./model/inscription";
import { catchError, delay, finalize, of } from "rxjs";
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
}