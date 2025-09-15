from django.db import models
from apps.grades.models import Grade

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True, blank=True, null=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Emoji or path to SVG icon")
    grades = models.ManyToManyField(Grade, related_name='subjects')

    def __str__(self):
        return self.name