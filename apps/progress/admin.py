from django.contrib import admin
from .models import Badge, UserBadge, Result

@admin.register(Badge)
class BadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ('user', 'badge', 'awarded_at')
    list_filter = ('badge',)
    search_fields = ('user__email', 'badge__name')

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'game', 'score', 'xp_earned', 'created_at')
    list_filter = ('game', 'game__subject')
    search_fields = ('user__email', 'game__title')
    readonly_fields = ('created_at',)