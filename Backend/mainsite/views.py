from django.shortcuts import render
from .serializers import CauseSerializer, BusinessSerializer, ParticipationSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import (Cause,
                     Business, 
                     Participation)

class CauseView(viewsets.ModelViewSet):
    serializer_class =  CauseSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, *args, **kwargs):
	    return Cause.objects.filter(user__id = self.request.user.id)
    

class BusinessView(viewsets.ModelViewSet):
    serializer_class =  BusinessSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, *args, **kwargs):
	    return Business.objects.filter(user__id = self.request.user.id, admin_approved=True)
    


class ParticipationView(viewsets.ModelViewSet):
    serializer_class =  ParticipationSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, *args, **kwargs):
	    return Participation.objects.filter(user__id = self.request.user.id)

