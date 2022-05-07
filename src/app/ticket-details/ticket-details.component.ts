import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  take,
  takeUntil,
  tap,
} from "rxjs/operators";
import { Ticket, User } from "../backend.service";
import {
  assignTicket,
  loadTickets,
  loadUsers,
  updateTicketCompletion,
} from "../store/app.actions";
import { getTicketById, getUsers } from "../store/app.selectors";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"],
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  ticketId: string;
  ticket$: Observable<Ticket>;
  users$: Observable<User[]>;

  editingAssignee = false;
  newAssignee = new FormControl("", Validators.required);

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(getUsers));
    this.route.params
      .pipe(
        map((param) => param.id),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.ticketId = id;
        // TODO: add action to only load one ticket
        this.store.dispatch(loadTickets());
        this.store.dispatch(loadUsers());
        // TODO: handling if ticket doesn't exist anymore
        this.ticket$ = combineLatest([
          this.store.pipe(
            select(getTicketById(id)),
            filter((x) => !!x)
          ),
          this.users$,
        ]).pipe(
          map(([ticket, users]) => ({
            ...ticket,
            name: users.find((user) => user.id === ticket.assigneeId)?.name,
          }))
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  finalizeUpdate() {
    const assignee = this.newAssignee.value;
    if (!assignee) {
      this.newAssignee.markAsDirty();
      return;
    }
    this.store.dispatch(
      assignTicket({ ticketId: this.ticketId, userId: assignee })
    );
    this.editingAssignee = false;
  }

  toggleCompletion(ticket: Ticket) {
    this.store.dispatch(
      updateTicketCompletion({
        ticketId: `${ticket.id}`,
        completed: !ticket.completed,
      })
    );
  }
}
