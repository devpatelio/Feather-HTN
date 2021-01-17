from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('auth/token/', include('apps.authentication.urls')),
    path('user/', include('apps.users.urls')),
    path('journal/', include('apps.journals.urls')),
    path('admin/', admin.site.urls),
]
