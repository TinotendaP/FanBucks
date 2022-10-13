from django.db import models
from ..api.models import Account

# Create your models here.

class Accounts(models.Model):
    user = 