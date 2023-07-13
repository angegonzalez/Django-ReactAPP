from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30, primary_key=True)
    password = models.CharField(max_length=30)
    time_connected = models.FloatField()
    last_login = models.DateTimeField()
    button_1_counter = models.IntegerField(null=True)
    button_2_counter = models.IntegerField(null=True)
