import { createReducer, on } from "@ngrx/store";
import { Ticket } from "src/app/backend.service";
import { loadTicketsSuccess } from "../app.actions";

export interface TicketsState {
  tickets: Ticket[];
}

export const initialState = {
  tickets: [],
};

export const ticketsReducer = createReducer(
  initialState,
  on(loadTicketsSuccess, (state, action) => {
    return { ...state, tickets: action.tickets };
  })
);
