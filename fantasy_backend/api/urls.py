from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
 
urlpatterns = [
    path('usernames/', views.UserView.username_list),
    path('users/', views.UserView.users_list),
    path('registration/', views.UserView.user_registration, name='registration'),
    path('login/', obtain_auth_token, name='login'),
    path('tournament/', views.TournamentView.tournament_list),
    path('tournament-slugs/', views.TournamentView.tournament_slugs_list),
    path('team/<slug:slug>/', views.TeamView.make_team),
    path('join_tourn/<slug:slug>/', views.TeamView.join_tourn),
    path('team_list/', views.TeamView.team_list),
    path('confirm_join/<slug:slug>/', views.TournamentView.confirm_join),
    path('account/<int:pk>/', views.UserView.account_detail),
    path('tournament/<int:pk>/', views.TournamentView.tournament_detail), 
    path('teams/', views.TeamView.tourn_team),
    path('team_change/<slug:slug>/', views.TeamView.team_update_delete),
    path('gameweek/', views.GameWeekView.check_gameweeks),
    path('activate-league/', views.GameWeekView.activateLeague),
] 