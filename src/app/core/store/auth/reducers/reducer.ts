import { createReducer, on } from "@ngrx/store"
import { User } from "../../../../pages/users/model/user"
import { authActions } from "../actions/actions"


export const featureName = 'auth'

export interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null,
}

export const authReducer = createReducer(initialState,
    on(authActions.setAuthUser, (state, action) => {
        return {
            ...state,
            user: action.user,
        }
    }),
    on(authActions.logout, (state) => {
        return {
            ...state,
            user: null,
        }
    })         
);
