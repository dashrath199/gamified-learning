from django.db import models
from django.conf import settings

class Badge(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    criteria = models.JSONField(help_text="e.g., {'type': 'score', 'subject': 'Math', 'value': 100, 'count': 5}")
    icon = models.CharField(max_length=255, help_text="Path to icon or emoji")

    def __str__(self):
        return self.name

class UserBadge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_badges")
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE, related_name="user_badges")
    awarded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'badge')

    def __str__(self):
        return f"{self.user.email} - {self.badge.name}"

class Result(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="results")
    game = models.ForeignKey('games.Game', on_delete=models.CASCADE, related_name="results")
    score = models.IntegerField()
    xp_earned = models.IntegerField()
    time_taken = models.PositiveIntegerField(help_text="in seconds")
    metadata = models.JSONField(blank=True, null=True, help_text="e.g., user's answers")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Result for {self.user.email} on {self.game.title}"