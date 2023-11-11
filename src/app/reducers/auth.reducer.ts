// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as authActions from 'src/app/actions/auth.actions';



export interface AuthState {
  token: string | null;
  error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(authActions.loginSuccess, (state, { token }) => ({ ...state, token, error: null })),
  on(authActions.loginFailure, (state, { error }) => ({ ...state, token: null, error })),
);
