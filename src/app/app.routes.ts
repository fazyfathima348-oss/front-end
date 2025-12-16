import { RouterModule, Routes } from '@angular/router';

import { Login } from './pages/login/login';

import { Home } from './pages/home/home';

import { StaffForm } from './pages/staff-form/staff-form';
import { StaffList } from './pages/staff-list/staff-list';
import { NgModule } from '@angular/core';

import { UserForm } from './pages/user/user-form/user-form';
import { UserList } from './pages/user/user-list/user-list';

import { PropertyForm } from './pages/property/property-form/property-form';
import { PropertyList } from './pages/property/property-list/property-list';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'login', component: Login},
    { path: 'staff-form', component: StaffForm},
    { path: 'staff-list', component: StaffList},
    { path: 'users', component: UserList },
    { path: 'users/add', component: UserForm },
    { path: 'users/edit/:id', component: UserForm },

    { path: 'properties', component: PropertyList },
    { path: 'properties/create', component: PropertyForm },
    { path: 'properties/edit/:pid', component: PropertyForm },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
