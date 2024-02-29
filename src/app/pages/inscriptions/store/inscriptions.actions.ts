import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionData, Inscription } from '../models/inscription';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    'Create Inscription': props<{ data: CreateInscriptionData }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),
    'Update Inscription': props<{ data: CreateInscriptionData }>(),
    'Update Inscription Success': props<{ data: Inscription }>(),
    'Update Inscription Failure': props<{ error: unknown }>(),    
    'Delete Inscription':props<{ id: string | number }>(),
    'Delete Inscription Success': props<{ data: Inscription }>(),
    'Delete Inscription Failure': props<{ error: unknown }>(),     
  }
});
