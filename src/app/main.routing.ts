import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';

// Example: import { TestComponent }      from './test.component';

const routes: Routes = [
  { path: 'order', component: OrderComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MainRouting {}
