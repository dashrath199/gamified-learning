from django.db import models
from apps.subjects.models import Subject

class Game(models.Model):
    class GameType(models.TextChoices):
        MULTIPLE_CHOICE = 'MCQ', 'Multiple Choice'
        FILL_IN_THE_BLANKS = 'FIB', 'Fill in the Blanks'
        SEQUENCING = 'SEQ', 'Sequencing'
        DRAG_AND_DROP = 'DND', 'Drag and Drop'

    title = models.CharField(max_length=200)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='games')
    description = models.TextField(blank=True)
    game_type = models.CharField(max_length=5, choices=GameType.choices)
    config = models.JSONField(default=dict, help_text="Game-specific settings like time limit, scoring rules")
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.title} ({self.get_game_type_display()})"

class Question(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='questions')
    prompt = models.TextField()
    options = models.JSONField(help_text="List of choices for MCQ, or parts for sequencing")
    answer = models.JSONField(help_text="Correct answer(s)")
    hint = models.CharField(max_length=255, blank=True)
    difficulty = models.PositiveSmallIntegerField(default=1, help_text="1-5 scale")

    def __str__(self):
        return self.prompt[:50]