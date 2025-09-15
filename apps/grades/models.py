from django.db import models

class Grade(models.Model):
    name = models.CharField(max_length=20, unique=True, help_text="e.g., 6, 7, 12")
    display_name = models.CharField(max_length=50, help_text="e.g., Grade 6, Senior Year")
    order = models.PositiveSmallIntegerField(default=0, help_text="Order for display")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.display_name