import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

// General
import {MainRouting} from './main.routing';

// Components
import { OrderComponent } from './order/order.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  // Each new page / route needs to be declared in this array
    declarations: [
        AppComponent,
        OrderComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
    imports: [
        MainRouting,
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
