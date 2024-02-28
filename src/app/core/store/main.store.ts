import { authReducer, featureName as authFeaturaName } from "./auth/reducers/reducer";

export const appReducers = {
    [authFeaturaName]: authReducer
}