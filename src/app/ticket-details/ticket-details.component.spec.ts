import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { BackendService } from "../backend.service";

import { TicketDetailsComponent } from "./ticket-details.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { State } from "../store/reducers";
import { Store } from "@ngrx/store";
import * as selectors from "../store/app.selectors";

describe("TicketDetailsComponent", () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  let mockStore: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ id: 0 }]),
          },
        },
      ],
    }).compileComponents();
    mockStore = TestBed.get(Store);
  });

  beforeEach(() => {
    // factory selector mocking is not easy with overrideSelector :(
    // not sure why this doesn't work even with commonjs https://github.com/ngrx/platform/discussions/3279
    spyOn(selectors, "getTicketById").and.returnValue(() => ({
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false,
    }));
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    mockStore.overrideSelector(selectors.getUsers, [
      { id: 111, name: "Victor" },
      { id: 222, name: "Jack" },
    ]);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  xit("should render correct assignee name", () => {
    expect(
      fixture.debugElement.nativeElement.querySelector("#ticketname")
        .textContent
    ).toContain("Victor");
  });
});
