from django.shortcuts import render
from .serializers import CauseSerializer, BusinessSerializer, ParticipationSerializer
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import (Cause,
                     Business, 
                     Participation)
from accounts.models import CustomUser
User = get_user_model()

class CauseView(viewsets.ModelViewSet):
    serializer_class =  CauseSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, *args, **kwargs):
	    return Cause.objects.all()
    
    def perform_create(self, serializer):
        user_instance = get_object_or_404(CustomUser, id=self.request.user.id)
        serializer.validated_data['user'] = user_instance
        instance = serializer.save()
        return instance
    
    def list(self, request, *args, **kwargs):
        return Response(Cause.objects.filter(id=request.user.id))

class BusinessView(viewsets.ModelViewSet):
    serializer_class =  BusinessSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, *args, **kwargs):
	    return Business.objects.all()
    
    def perform_create(self, serializer):
        user_instance = get_object_or_404(CustomUser, id=self.request.user.id)
        serializer.validated_data['user'] = user_instance
        instance = serializer.save()
        return instance
   
    
    def list(self, request, *args, **kwargs):
         return Response(Business.objects.filter(id=request.user.id, admin_approved=True).values())
        #  return super().list(request, *args, **kwargs)
    


class ParticipationView(viewsets.ModelViewSet):
    serializer_class =  ParticipationSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, *args, **kwargs):
	    return Participation.objects.filter(user__id = self.request.user.id)



class GetUserData(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        cause = Cause.objects.filter(user__id=request.user.id).values()
        business = Business.objects.filter(user__id=request.user.id).values()
        participation = Participation.objects.filter(user__id=request.user.id).values('id','cause__title', 'cause__user__email')
        data = {}
        data["cause"] = cause
        data["business"]= business
        data["participation"] = participation
        return Response(data)



class GetCauseAndBusinessData(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        cause = Cause.objects.all().order_by('-id').values('id','title','description', 'date_created', 'user__email')
        business = Business.objects.filter(admin_approved=True).order_by('-id').values('id','name', 'description','contact_person','contact_email', 'contact_phone','date_created', 'user__email' )
        data = {}
        data["cause"] = cause
        data["business"]= business
        return Response(data)
    

class CreatePrticipationData(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user_instance = get_object_or_404(CustomUser, id=self.request.user.id)
        cause_instance = get_object_or_404(Cause, id=kwargs.get("id"))
        if Participation.objects.filter(cause=cause_instance, user=user_instance).exists():
             return Response(status.HTTP_400_BAD_REQUEST)
        Participation.objects.create(user=user_instance, cause=cause_instance)
        return Response(status.HTTP_201_CREATED)