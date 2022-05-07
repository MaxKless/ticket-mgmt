import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { BackendService } from "../backend.service";
import {
  addTicket,
  assignTicket,
  updateTicketCompletion,
  loadTickets,
  loadTicketsSuccess,
  loadUsers,
  loadUsersSuccess,
} from "./app.actions";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private backend: BackendService) {}

  loadTicketsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTickets),
      switchMap((action) =>
        this.backend
          .tickets()
          .pipe(map((tickets) => loadTicketsSuccess({ tickets })))
      )
    )
  );

  addTicketEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTicket),
      switchMap((action) =>
        this.backend
          .newTicket({
            description: action.description,
            assigneeId: action.assigneeId,
          })
          .pipe(map(() => loadTickets()))
      )
    )
  );

  assignTicketEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assignTicket),
      switchMap((action) =>
        this.backend
          .assign(+action.ticketId, +action.userId)
          .pipe(map(() => loadTickets()))
      )
    )
  );

  completeTicketEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTicketCompletion),
      switchMap((action) =>
        this.backend
          .complete(+action.ticketId, action.completed)
          .pipe(map(() => loadTickets()))
      )
    )
  );

  loadUsersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap((action) =>
        this.backend.users().pipe(map((users) => loadUsersSuccess({ users })))
      )
    )
  );
}
