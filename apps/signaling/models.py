from django.db import models

from ..users.models import User


class QueuedUser(models.Model):
    user = models.ForeignKey(User, models.CASCADE, related_name='queues')
    queued = models.DateTimeField(auto_now_add=True)
