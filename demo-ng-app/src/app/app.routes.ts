import { Routes } from '@angular/router';
import { SecondPageComponent } from './pages/second-page/second-page.component';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { ThirdPageComponent } from './pages/third-page/third-page.component';
import { EmployeeComponent } from './components/employee/employee.component';

export const routes: Routes = [
    { path: 'first', component: FirstPageComponent },
    { path: 'second', component: SecondPageComponent },
    { path: 'third', component: ThirdPageComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: '', redirectTo: '/first', pathMatch: 'full' },
];
