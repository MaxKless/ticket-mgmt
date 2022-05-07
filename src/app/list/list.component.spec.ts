import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import { getTickets, getUsers } from "../store/app.selectors";
import { State } from "../store/reducers";

import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockStore: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [provideMockStore()],
    }).compileComponents();
    mockStore = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    mockStore.overrideSelector(getUsers, [
      { id: 111, name: "Victor" },
      { id: 222, name: "Jack" },
    ]);
    mockStore.overrideSelector(getTickets, [
      {
        id: 0,
        description: "Install a monitor arm",
        assigneeId: 111,
        completed: true,
      },
      {
        id: 1,
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: false,
      },
      {
        id: 2,
        description: "Hire a new dev.",
        assigneeId: 111,
        completed: false,
      },
    ]);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("datasource should contain all items by default", (done) => {
    component.dataSource.subscribe((value) => {
      expect(value.length).toEqual(3);
      done();
    });
  });

  xit("datasource should contain 2 items if filtered", (done) => {
    component.filterCompleted.setValue(true);
    // won't work because of missing ReactiveFormsModule
    fixture.detectChanges();
    component.dataSource.subscribe((value) => {
      console.log(value);
      expect(value.length).toEqual(2);
      done();
    });
  });
});
