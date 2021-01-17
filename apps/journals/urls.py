from django.urls import path

from . import views


urlpatterns = [
    path('', views.JournalListView.as_view()),
]
