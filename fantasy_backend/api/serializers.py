from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Account, Gameweeks, Tournament, Team


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['phone', 'terms_and_conditions', 'balance']

class UserSerializer(serializers.ModelSerializer):
    
    account = AccountSerializer(many=False) 
    
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 
        'password', 'email', 'account',]
        depth = 1
 
    def create(self, validated_data):
        account_data = validated_data.pop('account')
        user = User.objects.create(**validated_data)
        Account.objects.create(user=user, **account_data)
        return user


class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['creator', 'tourn_name', 'entry_fee', 
        'tourn_type', 'currency', 'start_date', 'end_date', 
        'min_teams', 'slug', 'is_active', 'number_of_teams', 
        'private', 'tourn_closed']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['owner', 'tournament', 'tournament_name', 
        'team_name', 'points', 'squad', 'team', 'team_bench'] 

class GameWeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gameweeks
        fields = ['name', 'deadline_time']