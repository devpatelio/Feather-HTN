from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views


urlpatterns = [
    path('', views.MyTokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
]
