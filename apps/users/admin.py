from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'full_name', 'role', 'grade', 'level', 'xp', 'is_staff')
    list_filter = ('role', 'grade', 'is_staff', 'is_superuser', 'groups')
    search_fields = ('email', 'full_name')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('full_name', 'grade')}),
        ('Gamification', {'fields': ('xp', 'level')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'role', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'password2', 'full_name', 'grade', 'role'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)