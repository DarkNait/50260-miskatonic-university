import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../inscriptions.service';


@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getInscriptions().pipe(
          map(data => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadInscriptionsByUserId$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptionsByUserId),
      concatMap((action) => 
        { return this.inscriptionsService.getInscriptionsByUserId(action.id).pipe(
          map((resp) => InscriptionsActions.loadInscriptionsByUserIdSuccess({ data: resp })),
          catchError(error => of(InscriptionsActions.loadInscriptionsByUserIdFailure({ error })))
        )}        
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) => {
        return this.inscriptionsService.createInscription(action.data).pipe(
          map((resp) => InscriptionsActions.createInscriptionSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.createInscriptionFailure({ error })))
        );
      })
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscription),
      concatMap((action) => {
        return this.inscriptionsService.updateInscription(action.data).pipe(
          map((resp) => InscriptionsActions.updateInscriptionSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.updateInscriptionFailure({ error })))
        );
      })
    );
  });

  updateInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) => {
        return this.inscriptionsService.deleteInscription(action.id).pipe(
          map((resp) => InscriptionsActions.deleteInscriptionSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.deleteInscriptionFailure({ error })))
        );
      })
    );
  });

  deleteInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  constructor(private actions$: Actions, private inscriptionsService: InscriptionsService) {}
}
