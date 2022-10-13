import { Routes } from '@angular/router';

import { AuthGuardService } from './auth_guard.service';

import { LoginFormComponent } from './account_details/login-form/login-form.component';
import { RegistrationFormComponent } from './account_details/registration-form/registration-form.component';
import { IntermediatePageComponent } from './account_details/intermediate-page/intermediate-page.component';

import { PointsComponent } from './squad_selection/points/points.component'; 
import { SquadSelectionComponent } from './squad_selection/squad-selection/squad-selection.component';
import { TeamSelectionComponent } from './squad_selection/team-selection/team-selection.component';
import { TransferPlayerComponent } from './squad_selection/transfer-player/transfer-player.component';
import { EditTeamComponent } from './squad_selection/edit-team/edit-team.component';

import { ActiveTournamentsComponent } from './tournaments/active-tournaments/active-tournaments.component';
import { JoinTournamentComponent } from './tournaments/join-tournament/join-tournament.component';
import { NewTournamentComponent } from './tournaments/new-tournament/new-tournament.component';
import { ConfirmJoinComponent } from './tournaments/confirm-join/confirm-join.component';

export const appRoutes: Routes = [
    { path: 'home', component: ActiveTournamentsComponent},
    { path: 'points', component: PointsComponent, canActivate : [AuthGuardService] },  
    { path: 'squad-selection', component: SquadSelectionComponent, canActivate : [AuthGuardService] },
    { path: 'team-selection', component: TeamSelectionComponent, canActivate : [AuthGuardService] },
    { path: 'join-tournament', component: JoinTournamentComponent, canActivate : [AuthGuardService] },
    { path: 'create-tournament', component: NewTournamentComponent, canActivate : [AuthGuardService] },
    { path: 'edit-squad', component: TransferPlayerComponent, canActivate : [AuthGuardService] }, 
    { path: 'team-edit', component: EditTeamComponent, canActivate : [AuthGuardService] },
    { path: 'confirm-join', component: ConfirmJoinComponent, canActivate : [AuthGuardService] },
    { path: 'intermediate-page', component: IntermediatePageComponent, canActivate : [AuthGuardService] },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
]
