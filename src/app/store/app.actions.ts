import { createAction, props } from "@ngrx/store";
import { Ticket, User } from "../backend.service";

export const loadTickets = createAction("[Tickets] Load Tickets");
export const loadTicketsSuccess = createAction(
  "[Tickets] Load Tickets Success",
  props<{ tickets: Ticket[] }>()
);
export const loadTicketsFail = createAction(
  "[Tickets] Load Tickets Fail",
  props<{ error: any }>()
);

export const addTicket = createAction(
  "[Tickets] Add Ticket",
  props<{ description: string; assigneeId: string }>()
);

export const assignTicket = createAction(
  "[Ticket] Assign Ticket",
  props<{ ticketId: string; userId: string }>()
);

export const updateTicketCompletion = createAction(
  "[Ticket] Update Ticket Completion",
  props<{ ticketId: string; completed: boolean }>()
);

export const loadUsers = createAction("[Tickets] Load Users");
export const loadUsersSuccess = createAction(
  "[Tickets] Load Users Success",
  props<{ users: User[] }>()
);
