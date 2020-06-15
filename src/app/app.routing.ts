import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth-component/auth.component';
import { RecordsComponent } from './components/records-component/records.component';
import { CanActivateGuard } from './model/canActivate.guard';
import { RecordComponent } from './components/records-component/record.component/record.component';

export const routes: Routes = [
    {
        path: "", component: AuthComponent,
    },
    {
        path: "records", component: RecordsComponent, canActivate: [CanActivateGuard]
    },
    {
        path: "record/:id", component: RecordComponent, canActivate: [CanActivateGuard]
    }
];