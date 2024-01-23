from django.contrib import admin
from .models import Cause, Business, Participation
# Register your models here.
admin.site.register([Cause, Business, Participation])

