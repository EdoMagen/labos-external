import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Example: import { TestComponent } from './test.component';
import { OrderComponent } from 'OrderComponent';

const routes: Routes = [
    // Example: {path: 'test', component: TestComponent},
    {path: 'order', component: OrderComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
