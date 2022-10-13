import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SquadlistService } from './squad_selection/squadList.service';
import { SquadEditService } from './squad_selection/transfer_player.service';
import { UserService, ConfirmService, RegistrationService } from './account_details/registration.service';
import { TeamService } from './squad_selection/team_name.service';
import { TournamentService } from './tournaments/tournament.service';
import { LoginService, UserInfoService } from './login.service';
import { appRoutes } from './app.router';
import { TeamPointsService } from './squad_selection/team-points.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth_guard.service';
import { LocalStorageService } from './local_storage.service';

import { AppComponent } from './app.component';
import { SquadSelectionComponent } from './squad_selection/squad-selection/squad-selection.component';
import { TeamSelectionComponent } from './squad_selection/team-selection/team-selection.component';
import { NewTournamentComponent } from './tournaments/new-tournament/new-tournament.component';
import { JoinTournamentComponent } from './tournaments/join-tournament/join-tournament.component';
import { PointsComponent } from './squad_selection/points/points.component';
import { ActiveTournamentsComponent } from './tournaments/active-tournaments/active-tournaments.component';
import { LoginFormComponent } from './account_details/login-form/login-form.component';
import { RegistrationFormComponent } from './account_details/registration-form/registration-form.component';
import { TransferPlayerComponent } from './squad_selection/transfer-player/transfer-player.component';
import { EditTeamComponent } from './squad_selection/edit-team/edit-team.component';
import { UserInfoComponent } from './account_details/user-info/user-info.component';
import { ConfirmJoinComponent } from './tournaments/confirm-join/confirm-join.component';
import { IntermediatePageComponent } from './account_details/intermediate-page/intermediate-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SquadSelectionComponent,
    TeamSelectionComponent,
    NewTournamentComponent,
    JoinTournamentComponent,
    PointsComponent,
    ActiveTournamentsComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    TransferPlayerComponent,
    EditTeamComponent,
    UserInfoComponent,
    ConfirmJoinComponent,
    IntermediatePageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [{provide: SquadlistService, useFactory: SquadlistService}, 
    {provide: TeamService, useClass: TeamService},
    {provide: TeamPointsService, useClass: TeamPointsService},
    {provide: TournamentService, useClass: TournamentService},
    {provide: UserService, useClass: UserService},
    {provide: ConfirmService, useClass: ConfirmService},
    {provide: LoginService, useClass: LoginService},
    {provide: RegistrationService, useClass: RegistrationService},
    {provide: SquadEditService, useClass: SquadEditService},
    {provide: UserInfoService, useClass: UserInfoService},
    {provide: AuthService, useClass: AuthService},
    {provide: AuthGuardService, useClass: AuthGuardService},
    {provide: LocalStorageService, useClass: LocalStorageService},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
