
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
