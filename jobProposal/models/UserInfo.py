from django.db import models


class UserInfo(models.Model):
    url = models.TextField()
    title = models.TextField()
    description = models.TextField()