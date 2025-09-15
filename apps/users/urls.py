from django.urls import path
from .views import LoginView, RegisterView, DashboardView, ProfileView, LeaderboardView
app_name = 'users'
urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
]