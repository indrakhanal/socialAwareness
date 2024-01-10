# from django.contrib import admin
from unicodedata import name
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

from rest_framework import routers
router = routers.DefaultRouter()
# router.register('filter_location', filter_data, 'filter_location')
app_name = 'pets'

urlpatterns = [
    path('v1/', include(router.urls)),
]

