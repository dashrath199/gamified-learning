from django.contrib import admin
from .models import Subject

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'get_grades')
    search_fields = ('name', 'code')
    filter_horizontal = ('grades',)

    def get_grades(self, obj):
        return ", ".join([g.name for g in obj.grades.all()])
    get_grades.short_description = 'Grades'