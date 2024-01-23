from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class CauseSerializer(serializers.ModelSerializer):
    date_created  = serializers.DateTimeField(read_only = True)
    
    class Meta:
        model = Cause
        fields = ["title", "description", "user", "date_created"]


class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = ["name", "description", "contact_person", "contact_email", "contact_phone", "user"]


class ParticipationSerializer(serializers.ModelSerializer):
    date_joined  = serializers.DateTimeField(read_only = True)
    
    class Meta:
        model = Participation
        fields = ["user", "cause", "date_joined"]