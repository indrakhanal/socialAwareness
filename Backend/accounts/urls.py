# from django.contrib import admin
from unicodedata import name
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import *

from rest_framework import routers
router = routers.DefaultRouter()
# router.register('login/', MyObtainTokenPairView, 'login')
# router.register('login/refresh/', TokenRefreshView, 'refresh')
app_name = 'accounts'
# from accounts.views import FacebookLogin, GithubLogin

urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('/sign_up/', RegisterAPI.as_view(), name='sign-up'),
    path('api/', include(router.urls)),
    path('api/login/', EmailTokenObtainPairView.as_view(), name="login"),
    path('api/register/', RegisterView.as_view(), name='register'),
    path("api/login/refresh", TokenRefreshView.as_view(), name="refresh"),
    path('api/change-password/', ChangePasswordView.as_view(), name='change_password'),
    # path('auth/facebook/', FacebookLogin.as_view(), name='fb_login'), 
    # path('auth/github/', GithubLogin.as_view(), name='github_login'),
    # path("api/check_user/", check_username_available, name="check-user"),
    # path('upload_category/', upload_category_breed, name="upload-category"),
]
