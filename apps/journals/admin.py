from django.contrib import admin
from django.contrib.admin.options import ModelAdmin

from .models import Journal


@admin.register(Journal)
class JournalAdmin(ModelAdmin):
    model = Journal
    list_display = ('user', 'date')
    search_fields = list_display
