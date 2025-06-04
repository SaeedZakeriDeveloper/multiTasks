import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './tasks/task1/components/login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SimpleCrudComponent } from './tasks/task3/components/simple-crud/simple-crud.component';
import { UserListComponent } from './tasks/task2/components/user-list/user-list.component';
import { UserDetailsComponent } from './tasks/task2/components/user-details/user-details.component';
import { CrudTestComponent } from './tasks/task4/components/crud-test/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SimpleCrudComponent,
    UserListComponent,
    UserDetailsComponent,
    CrudTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
