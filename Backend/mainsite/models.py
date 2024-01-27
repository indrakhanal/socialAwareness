from django.db import models
from django.conf import settings


# Create your models here.
class Cause(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return "{0}-->{1}".format(self.title, self.user.email)

class Business(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    contact_person = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    admin_approved = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return "{0}-->{1}".format(self.name, self.user.email)

class Participation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cause = models.ForeignKey(Cause, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{0}-->{1}".format(self.cause.title, self.user.email)
