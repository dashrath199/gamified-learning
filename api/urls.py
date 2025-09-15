from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, GradeViewSet, SubjectViewSet, GameViewSet, 
    LeaderboardViewSet, UserProgressView
)

router = DefaultRouter()
router.register(r'grades', GradeViewSet, basename='grade')
router.register(r'subjects', SubjectViewSet, basename='subject')
router.register(r'games', GameViewSet, basename='game')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='auth_register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/me/progress/', UserProgressView.as_view(), name='user_progress'),
]