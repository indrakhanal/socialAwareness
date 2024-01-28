# from django.contrib import admin
from unicodedata import name
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

from rest_framework import routers
router = routers.DefaultRouter()
app_name = 'mainsite'
router.register('cause', CauseView, 'cause')
router.register('business', BusinessView, 'business')
router.register('participation', ParticipationView, 'participation')


urlpatterns = [
    path('main/', include(router.urls)),
    path('user/detail/', GetUserData.as_view(), name='user_details'),
    path('user/alldata/', GetCauseAndBusinessData.as_view(), name='all_data'),
    path('user/create_participation/<int:id>/', CreatePrticipationData.as_view(), name='create_participation')
]

