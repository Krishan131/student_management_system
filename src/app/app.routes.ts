import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { StudentList } from './components/student-list/student-list';
import { StudentForm } from './components/student-form/student-form';
import { StudentDetail } from './components/student-detail/student-detail';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'students', component: StudentList },
    { path: 'students/new', component: StudentForm },
    { path: 'students/:id', component: StudentDetail },
    { path: 'students/:id/edit', component: StudentForm },
    { path: '**', redirectTo: '/dashboard' }
];

