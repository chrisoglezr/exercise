import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { DialogEmailCharacterFrequency } from './person/person.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    DialogEmailCharacterFrequency
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  entryComponents: [
    PersonComponent,
    DialogEmailCharacterFrequency
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
