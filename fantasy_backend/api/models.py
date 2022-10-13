from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.
class Account(models.Model):
    phone = models.BigIntegerField(blank = False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    terms_and_conditions = models.BooleanField() 
    balance = models.DecimalField(blank=True, default=0, max_digits = 7, decimal_places=2)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Tournament(models.Model):
    TOURN_TYPE = (
        ('league', 'League'),
        ('knockout_h2h', 'Knockout_h2h'), 
        ('league_h2h', 'League_h2h'),
    )
    CURRENCY = (
        ('usd', 'USD'),
        ('rtgs', 'RTGS'),
        ('rands', 'RANDS'),
    )
    creator = models.ForeignKey(User, 
                                on_delete=models.PROTECT
                                )
    tourn_name = models.CharField(max_length=100, blank=False, unique=True)
    entry_fee = models.DecimalField(max_digits = 7, decimal_places=2)
    tourn_type = models.CharField(max_length=20, choices=TOURN_TYPE, default='league')
    currency = models.CharField(max_length=5, choices=CURRENCY)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    min_teams = models.IntegerField(default=3)
    slug = models.SlugField()
    is_active = models.BooleanField(default=True)
    number_of_teams = models.IntegerField(default=1)
    private = models.BooleanField(default=True)
    tourn_closed = models.BooleanField(default=False)
 
    def __str__(self):
        return self.tourn_name



class Team(models.Model):
#    TOURN_TYPE = (
 #   ('league', 'League'),
  #  ('knockout_h2h', 'Knockout_h2h'), 
   # ('league_h2h', 'League_h2h'),
    #)
    owner = models.ForeignKey(User,
                                on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament,
                                    on_delete=models.PROTECT)
    tournament_name = models.CharField(blank=True, max_length=100)
    team_name = models.CharField(max_length=100, blank=True)
    points = models.IntegerField(default = 0)
    squad = models.JSONField(max_length=100, blank=True, default = dict(player = "rango"))
    team = models.JSONField(max_length=100, blank=True, default = dict(player = "rango"))
    team_bench = models.JSONField(max_length=100, blank=True, default = dict(player = "rango"))
    current_bet = models.DecimalField(blank=True, default=0, max_digits = 7, decimal_places=2)

    def __str__(self):
        return self.team_name

class Gameweeks(models.Model):
    name = models.CharField(max_length=100)
    deadline_time = models.DateTimeField() 

class TournamentWinners(models.Model):
    team = models.ForeignKey(Team, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits = 7, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    winner_token = models.CharField(max_length=70)


