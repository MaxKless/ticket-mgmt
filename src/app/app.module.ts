import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./store/app.effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListComponent } from "./list/list.component";
import { RouterModule, Routes } from "@angular/router";
import { TicketDetailsComponent } from "./ticket-details/ticket-details.component";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },
  {
    path: "tickets/:id",
    component: TicketDetailsComponent,
  },
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
  },
];
@NgModule({
  declarations: [AppComponent, ListComponent, TicketDetailsComponent],
  imports: [
    MatTableModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects]),
    BrowserAnimationsModule,
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
