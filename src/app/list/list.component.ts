import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map, startWith, tap } from "rxjs/operators";
import { Ticket, User } from "../backend.service";
import {
  addTicket,
  updateTicketCompletion,
  loadTickets,
  loadUsers,
} from "../store/app.actions";
import { getTickets, getUsers } from "../store/app.selectors";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  displayedColumns = ["id", "description", "name", "completed", "details"];
  tickets: Observable<Ticket[]>;
  users: Observable<User[]>;

  dataSource: Observable<Ticket[]>;

  newDescription = new FormControl("", [Validators.required]);
  newAssignee = new FormControl("", Validators.required);

  filterCompleted = new FormControl(false);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTickets());
    this.store.dispatch(loadUsers());
    this.tickets = this.store.pipe(select(getTickets));
    this.users = this.store.pipe(select(getUsers));

    // this should go in a facade
    this.dataSource = combineLatest([
      this.store.pipe(select(getTickets)),
      this.users,
      this.filterCompleted.valueChanges.pipe(
        startWith(this.filterCompleted.value)
      ),
    ]).pipe(
      map(
        ([tickets, users, filterCompleted]) =>
          [
            tickets.filter((ticket) => !filterCompleted || !ticket.completed),
            users,
          ] as const
      ),
      map(([tickets, users]) =>
        tickets.map((ticket) => ({
          ...ticket,
          name: users.find((user) => user.id === ticket.assigneeId)?.name,
        }))
      ),
      // sort uncompleted first
      map((tickets) =>
        tickets.sort((a, b) =>
          a.completed === b.completed ? 0 : b.completed ? -1 : 1
        )
      )
    );
  }

  addTicket() {
    const description = this.newDescription.value;
    const assignee = this.newAssignee.value;
    if (!description || !assignee) {
      this.newDescription.markAsDirty();
      this.newAssignee.markAsDirty();
      // TODO: some kind of feedback
      return;
    }
    this.store.dispatch(addTicket({ description, assigneeId: assignee }));
    this.newDescription.reset();
    this.newAssignee.reset();
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
