import { createFeatureSelector, createSelector } from "@ngrx/store";
import { of } from "rxjs";
import { TicketsState } from "./reducers/tickets.reducer";
import { UsersState } from "./reducers/users.reducer";

const getTicketsState = createFeatureSelector<TicketsState>("tickets");
const getUsersState = createFeatureSelector<UsersState>("users");

export const getTickets = createSelector(
  getTicketsState,
  (state) => state.tickets
);

export const getTicketById = (id: string) =>
  createSelector(getTicketsState, (state) =>
    state.tickets.find((ticket) => ticket.id === +id)
  );

export const getUsers = createSelector(getUsersState, (state) => state.users);
