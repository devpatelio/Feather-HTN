from rest_framework import serializers

from .models import Journal
from ..users.models import User


class JournalSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = Journal
        fields = '__all__'
