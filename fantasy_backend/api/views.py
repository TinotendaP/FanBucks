
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from .models import Account, Tournament, Team, Gameweeks
from django.contrib.auth.models import User
from .serializers import GameWeekSerializer, UserSerializer,GameWeekSerializer, TournamentSerializer, TeamSerializer
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.views import obtain_auth_token
from django.views.decorators.csrf import csrf_exempt
import datetime as dt
import pytz

# Create your views here.
#LIST VIEWS
# Account-LIST-VIEW


class UserView():
    @api_view(['GET',])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def username_list(request):
        if request.method == 'GET':
            print(request.user)
            user = User.objects.all()
            users=[]
            for person in user:
                users.append(person.email)
            serializer = UserSerializer(user, many=True)
            print(users)
            return Response(users)

    @api_view(['GET',])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def users_list(request):
        if request.method == 'GET':
            print(request.user)
            users = User.objects.all()
            balance={}
            for user in users:
                if request.user.id == user.id:
                    serializer = UserSerializer(user)
                    balance['first_name'] = user.first_name
                    balance['last_name'] = user.last_name
                    balance['balance'] = user.account.balance
            return Response(balance)

    @api_view(['POST',])
    def user_registration(request):
        if request.method == 'POST':
            request.data['password']=make_password(request.data['password'])
            print(request.data)
            serializer = UserSerializer(data = request.data)
            info = {}
            if serializer.is_valid():
                final = serializer.save()
                #LOAD SERIALIZER DATA INTO A 'final' DICT
                info['username'] = final.username
                info['email'] = final.email
                info['phone'] = final.account.phone
                info['terms_and_conditions'] = final.account.terms_and_conditions
                info['token'] = Token.objects.get(user=final).key
                return Response(info, status.HTTP_201_CREATED)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

    #Account-DETAIL-VIEWS

    @api_view(['GET', 'PUT', 'DELETE'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def account_detail(request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        owner = request.user.id
        if owner != pk:
            return Response({'response': "You are not authorised to access user"})

        if request.method == 'GET':
            serializer = UserSerializer(user)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# TOURNAMENT-LIST-VIEW
@csrf_exempt
class TournamentView():

    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])

    def confirm_join(request, slug):
        if request.method == 'GET':
            tournament = Tournament.objects.get(slug=slug)
            serializer = TournamentSerializer(tournament)
            if tournament.tourn_closed == False:
                return Response(serializer.data)
            else:
                return Response({'Access':False})

    @api_view(['GET', 'POST'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def tournament_list(request):
        if request.method == 'GET':
            tournament = Tournament.objects.all()
            serializer = TournamentSerializer(tournament, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':

            serializer = TournamentSerializer(data = request.data)
            request.data['creator'] = request.user.id
            info = {}
            if serializer.is_valid():
                final = serializer.save()
                info['slug'] = final.slug
                return Response(info, status.HTTP_201_CREATED)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)  

    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def tournament_slugs_list(request):
        if request.method == 'GET':
            tournaments = Tournament.objects.all()
            slugs=[]
            for tournament in tournaments:
                if tournament.tourn_closed == False:
                    slugs.append(tournament.slug)
            return Response(slugs)


    @api_view(['GET', 'PUT', 'DELETE'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def tournament_detail(request, pk):
        try:
            tournament = Tournament.objects.get(pk=pk)
        except Tournament.DoesNotExist:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        if request.method == 'GET':
            serializer = TournamentSerializer(tournament)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = TournamentSerializer(tournament, data=request.data)
            if serializer.is_valid:
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            tournament.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# TEAM-LIST-VIEW
class TeamView():

    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def team_list(request):
        if request.method == 'GET':
            teams = Team.objects.all()
            myteams = []
            for i in teams:
                if i.owner.id == request.user.id:
                    myteams.append(i)
            final = TeamSerializer(myteams, many=True)
            return Response(final.data)

    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def join_tourn(request, slug):
        # creating a list of teams in tournament inorder to make team_name unique

        if request.method == 'GET':
            team = Team.objects.all()
            tourn = Tournament.objects.get(slug=slug)
            teams = []
            for i in team:
                if i.tournament.id == tourn.id:
                    teams.append(i)
            final = TeamSerializer(teams, many=True)
            return Response(final.data)
 
    @api_view(['GET', 'POST'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def make_team(request, slug):

        if request.method == 'POST':

            serializer = TeamSerializer(data = request.data)

            try:
                tourn = Tournament.objects.get(slug=slug)
                request.data['tournament'] = tourn.id
                request.data['owner'] = request.user.id
                request.data['tournament_name'] = tourn.tourn_name
            except Tournament.DoesNotExist:
                return Response(status = status.HTTP_400_BAD_REQUEST)

            team = Team.objects.all()
            # creating a list of teams in tournament inorder to make team_name unique
            print('takoniwa')
            if serializer.is_valid():
                mid = serializer.validated_data
                print('takoniwa zve')
                for i in team:
                    if mid['tournament'] != i.tournament:
                        print('iwe')
                        serializer.save()
                        return Response(serializer.data, status.HTTP_201_CREATED)
                    else:
                        print('ndikoko')
                        return Response({'response': "You are already in tournament"})
                
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST) 



        elif request.method == 'GET':
            try:
                tourn = Tournament.objects.get(slug=slug)
                teams = Team.objects.all()
            except Tournament.DoesNotExist:
                return Response(status = status.HTTP_400_BAD_REQUEST)
            for team in teams:
                print(team.owner.id)
                print(request.user.id)
                if team.owner.id == request.user.id:
                    if team.tournament.id == tourn.id:
                        print('two down')
                        data = Team.objects.get(id=team.id)
                        serializer = TeamSerializer(data)
                        return Response(serializer.data)
            return Response(status=status.HTTP_400_BAD_REQUEST)                  

    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def tourn_team(request):
        try:
            teams = Team.objects.all()
        except Team.DoesNotExist:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        
        teams_in_tourn = []
        for i in teams:                  
            if i.owner.id == request.user.id:
                for t in teams:
                    if t.tournament == i.tournament:
                        if t not in teams_in_tourn:
                            teams_in_tourn.append(t)



        if request.method == 'GET':
            serializer = TeamSerializer(teams_in_tourn, many=True)
            return Response(serializer.data)
    
    @api_view(['PUT', 'DELETE'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def team_update_delete(request, slug):
        
        try:
            tourn = Tournament.objects.get(slug=slug)
            teams = Team.objects.all()
            request.data['tournament'] = tourn.id
            request.data['owner'] = request.user.id
            request.data['tournament_name'] = tourn.tourn_name
        except Tournament.DoesNotExist:
            return Response(status = status.HTTP_400_BAD_REQUEST)
        for team in teams:
            if team.owner.id == request.user.id:
                if team.tournament.id == tourn.id:
                    data = Team.objects.get(id=team.id)
                    if request.method == 'PUT':
                        serializer = TeamSerializer(team, data = request.data)
                        if serializer.is_valid():
                            serializer.save()
                            return Response(serializer.data)
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    elif request.method == 'DELETE':
                        team.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)



class GameWeekView():
    @api_view(['GET'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def check_gameweeks(request):

        if request.method == 'GET':
            data = {}
            info = []
            gameweeks = Gameweeks.objects.all()
            for i in gameweeks:
                n = i.deadline_time.replace(tzinfo=None)
                v = dt.datetime.now()
                w = v.replace(tzinfo=None)
                if n < w:
                    gameweek = i
                    x = w-n
                    info.append(x)
                    print(x)
            
            if info[len(info)-1]<dt.timedelta(days=3):
                data['transfer'] = False
            else:
                data['transfer'] = True
                data['name'] = gameweek.name
            return Response(data, status.HTTP_201_CREATED)

    @api_view(['PUT'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def activateLeague(request):
        tourns = Tournament.objects.all()
        teams = Team.objects.all()

        if request.method == 'PUT':
            for tourn in tourns:

                currentDate = dt.datetime.now().replace(tzinfo=None)
                startDate = tourn.start_date.replace(tzinfo=None)
                endDate = tourn.end_date.replace(tzinfo=None)

                all_teams = []
                info = {}
                for team in teams:
                    if tourn.id == team.tournament.id:
                        all_teams.append(team)
                info['creator'] = tourn.creator.id
                info['tourn_name'] = tourn.tourn_name
                info['entry_fee'] = tourn.entry_fee
                info['tourn_type'] = tourn.tourn_type
                info['currency'] = tourn.currency
                info['start_date'] = tourn.start_date
                info['end_date'] = tourn.end_date
                info['min_teams'] = tourn.min_teams
                info['slug'] = tourn.slug
                tourn.number_of_teams = len(all_teams)
                if tourn.number_of_teams>tourn.min_teams:
                    if startDate<currentDate:
                        info['is_active'] = True
                    else:
                        info['is_active'] = False
                else:
                    info['is_active'] = False
                info['number_of_teams'] = len(all_teams)

                info['private'] = tourn.private

                if currentDate<endDate:
                    info['tourn_closed'] = False
                else:
                    info['tourn_closed'] = True
                
                serializer = TournamentSerializer(tourn, data = info)
                if serializer.is_valid():
                    serializer.save()
                    print('zvaita')
            return Response({'response': 'zvapera'})

            
    @api_view(['POST'])
    @authentication_classes([TokenAuthentication])
    @permission_classes([IsAuthenticated])
    def tournWinners(request):
        tourns = Tournament.objects.all()
        teams = Team.objects.all()

        dummy_team = []
        dummy_team_points = []

        if request.method == 'POST':
            for tourn in tourns:
                for team in teams:
                    if team.tournament.id == tourn.id:
                        dummy_team_points.append(team.points)
                dummy_team_points.sort(reverse=True)
                for team in teams:
                    for points in dummy_team_points:
                        if points == team.points:
                            dummy_team.append(team)
                
                data = {}
                data['team'] = team[0]
                data['date'] = dt.datetime.now()

                data['amount'] = tourn.entry_fee * tourn.number_of_teams

                serializer = TeamSerializer(data = data)
                v = dt.datetime.now()
                w = v.replace(tzinfo=None)

                if tourn.end_date<w:
                    if serializer.is_valid():
                        serializer.save()
                        print('zvaita')
            return Response({'response': 'zvapera'})    
 
           
    

            



