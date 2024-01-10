import imp
from unicodedata import name
from urllib import response
from django.conf import settings

from django.shortcuts import render
# from .serializers import MyTokenObtainPairSerializer, ChangePasswordSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
# from .serializers import RegisterSerializer
from .serializers import *
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from accounts import serializers
from .forms import FileUploadForm
# from pets.models import AnimalCategory, Location
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
User=get_user_model()
from .serializers import UserSerializer, TokenObtainPairSerializer
from django.utils.translation import gettext_lazy as _
from django.shortcuts import render
# from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
# from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.views import SocialLoginView

class RegisterView(generics.CreateAPIView):
    """
    User registration API
    """
    # queryset = settings.AUTH_USER_MODEL.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        # try:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = {"message":"user registration successful"}
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)
        # except:
        #     data = {"message":"error"}
        #     return Response(data, status=status.HTTP_201_CREATED, headers=headers)




class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
  


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    # permission_classes = (DashboardPermissions,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        if self.object.id == None:
            return Response({"error":"No user to change password please login First"}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"error": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'success': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)