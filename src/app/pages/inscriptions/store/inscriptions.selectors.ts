import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.InscriptionsState>(
  fromInscriptions.inscriptionsFeatureKey
);

export const selectInscriptions = createSelector(selectInscriptionsState, (state) => state.inscriptions);

export const selectInscriptionsIsLoading = createSelector(selectInscriptionsState, (state) => state.loading);