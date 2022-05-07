import { createReducer, on } from "@ngrx/store";
import { Ticket, User } from "src/app/backend.service";
import { loadTicketsSuccess, loadUsersSuccess } from "../app.actions";

export interface UsersState {
  users: User[];
}

export const initialState = {
  users: [],
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, action) => ({ ...state, users: action.users }))
);
