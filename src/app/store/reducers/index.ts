import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { ticketsReducer, TicketsState } from "./tickets.reducer";
import { usersReducer, UsersState } from "./users.reducer";

export interface State {
  tickets: TicketsState;
  users: UsersState;
}

export const reducers: ActionReducerMap<State> = {
  tickets: ticketsReducer,
  users: usersReducer,
};
