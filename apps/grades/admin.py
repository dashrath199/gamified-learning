from django.contrib import admin
from .models import Grade

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('display_name', 'name', 'order')
    search_fields = ('display_name', 'name')