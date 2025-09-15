from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = 'STUDENT', 'Student'
        TEACHER = 'TEACHER', 'Teacher'
        ADMIN = 'ADMIN', 'Admin'

    # Remove username, use email as the unique identifier
    username = None
    email = models.EmailField(_("email address"), unique=True)
    
    full_name = models.CharField(max_length=255, blank=True)
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
    grade = models.ForeignKey('grades.Grade', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    xp = models.PositiveIntegerField(default=0)
    level = models.PositiveIntegerField(default=1)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def __str__(self):
        return self.email

    @property
    def display_name(self):
        return self.full_name or self.email.split('@')[0]