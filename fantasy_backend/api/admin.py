

# Register your models here.
from dataclasses import fields
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Account, Gameweeks, Tournament, Team

# Register your models here.

class AccountInLine(admin.StackedInline):
    model = Account
    can_delete = False
    verbose_name_plural = 'account'
 
class UserAdmin(BaseUserAdmin):
    inlines = (AccountInLine,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ['creator', 'tourn_name', 'entry_fee', 'tourn_type', 'slug']
    prepopulated_fields = {'slug': ('tourn_name',)}

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin): 
    list_display = ['owner', 'tournament', 'tournament_name', 'team_name', 'points']

@admin.register(Gameweeks)
class GameweeksAdmin(admin.ModelAdmin): 
    list_display = ['name', 'deadline_time']

