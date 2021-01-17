from django.db import models

from ..users.models import User


# class Mood(models.IntegerChoices):
#     HAPPY = 0, 'Happy'
#     SAD = 1, 'Sad'
#     ANGRY = 2, 'Angry'
#     SCARED = 3, 'Scared'


class Journal(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='journals')
    date = models.DateTimeField(auto_now_add=True)
    # mood = models.IntegerField(choices=Mood.choices)
    feeling = models.CharField(max_length=255)
    events = models.CharField(max_length=255)
    goals = models.CharField(max_length=255)
