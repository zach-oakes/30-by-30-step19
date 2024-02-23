import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {authorizationGuard} from "./authorization.guard";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {FlightDetailViewComponent} from "./flight-detail-view/flight-detail-view.component";
import {FlightListViewComponent} from "./flight-list-view/flight-list-view.component";
import {FlightResolver} from "./flight-resolver";
import {FlightsResolver} from "./flights-resolver";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginScreenComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [authorizationGuard]},
    {
        path: 'flight/:id',
        component: FlightDetailViewComponent,
        canActivate: [authorizationGuard],
        resolve: { flight: FlightResolver }
    },
    {
        path: 'flights',
        component: FlightListViewComponent,
        canActivate: [authorizationGuard],
        resolve: {flights: FlightsResolver }
    },
    {path: 'createAccount', component: CreateAccountComponent},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
