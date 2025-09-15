from django.urls import path
from . import views

urlpatterns = [
    # Example URL: /games/subject/1/
    path('subject/<int:subject_id>/', views.subject_games_list, name='subject_games_list'),
    
    # Example URL: /games/play/5/
    path('play/<int:game_id>/', views.play_game, name='play_game'),
]