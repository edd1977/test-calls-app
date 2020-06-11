import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth-component/auth.component';
import { RecordsComponent } from './components/records-component/records.component';
import { CanActivateGuard } from './model/canActivate.guard';

export const routes: Routes = [
    {
        path: "", component: AuthComponent,
    },
    {
        path: "records", component: RecordsComponent, canActivate: [CanActivateGuard]
    }
];