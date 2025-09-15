from django.contrib import admin
from .models import Game, Question

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('title', 'subject', 'game_type', 'is_active')
    list_filter = ('subject', 'game_type', 'is_active')
    search_fields = ('title', 'description')
    inlines = [QuestionInline]

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('prompt', 'game', 'difficulty')
    list_filter = ('game', 'game__subject', 'difficulty')
    search_fields = ('prompt',)