from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from rest_framework.exceptions import APIException
from django.utils.translation import gettext_lazy as _
from rest_framework import status


class EmailBackend(ModelBackend):
    def authenticate(self, request, **kwargs):
        UserModel = get_user_model()
        try:
            email = kwargs.get('email', None)
            if email is None:
                email = kwargs.get('username', None)
            if email is not None:
                try:
                    user = UserModel.objects.get(email=email)
                    if user.check_password(kwargs.get('password', None)):
                        return user
                except:
                    try:
                        user = UserModel.objects.get(phone=email)
                        if user.check_password(kwargs.get('password', None)):
                            return user
                    except UserModel.DoesNotExist:
                        return None
            # else:
            #     user = UserModel.objects.get(email=email)
            # if user.check_password(kwargs.get('password', None)):
            #     return user
        except UserModel.DoesNotExist:
            return None
        return None


class AuthenticationFailed(APIException):
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = _('Incorrect authentication credentials.')
    default_code = 'authentication_failed'
