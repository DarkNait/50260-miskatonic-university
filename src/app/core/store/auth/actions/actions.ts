import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../../../pages/users/model/user";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth User': props<{ user: User }>(),
        'logout': emptyProps()
    }
})