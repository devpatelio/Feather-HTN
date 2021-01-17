from django.contrib import admin
from django.contrib.admin.options import ModelAdmin
from django.contrib.auth.admin import UserAdmin

from .models import Interest, User


@admin.register(User)
class UserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'first_name', 'last_name')
    search_fields = list_display
    list_filter = ('username', 'first_name', 'last_name')
    ordering = ('username',)
    fieldsets = (
        ('Personal Information', {'fields': ('username', 'first_name', 'last_name', 'password', 'interests')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'user_permissions')}),
    )


@admin.register(Interest)
class InterestAdmin(ModelAdmin):
    model = Interest
    list_display = ('topic',)
    search_fields = list_display
