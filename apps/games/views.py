from django.shortcuts import render, get_object_or_404
from .models import Game
from apps.subjects.models import Subject

def subject_games_list(request, subject_id):
    """
    Displays a list of all active games for a given subject.
    """
    subject = get_object_or_404(Subject, pk=subject_id)
    games = Game.objects.filter(subject=subject, is_active=True)
    context = {
        'subject': subject,
        'games': games
    }
    return render(request, 'games/subject_games_list.html', context)

def play_game(request, game_id):
    """
    Renders the main game page for a specific game.
    The actual game mechanics are handled by JavaScript.
    """
    game = get_object_or_404(Game, pk=game_id)
    context = {
        'game': game
    }
    return render(request, 'games/play_game.html', context)