from django.db import transaction
from django.contrib.auth import get_user_model

from apps.games.models import Game
from apps.progress.models import Result, Badge, UserBadge

User = get_user_model()

# Define XP thresholds for leveling up. Level N requires LEVEL_THRESHOLDS[N-1] total XP.
# Example: Level 2 requires 100 XP, Level 3 requires 300 XP, etc.
LEVEL_THRESHOLDS = [100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5000]

def update_user_level(user: User):
    """Updates a user's level based on their XP."""
    current_level = user.level
    new_level = current_level

    for i, threshold in enumerate(LEVEL_THRESHOLDS, start=2): # Levels start from 2
        if user.xp >= threshold:
            new_level = i
        else:
            break # Stop when the user's XP is less than the threshold

    if new_level > current_level:
        user.level = new_level
        # Here you could also trigger a notification for leveling up
    return new_level > current_level


def check_and_award_badges(user: User):
    """Checks user progress and awards badges if criteria are met."""
    awarded_badges = []
    # Example Badge: "First Game!"
    try:
        first_game_badge = Badge.objects.get(name="First Game!")
        # Check if the user has this badge already
        has_badge = UserBadge.objects.filter(user=user, badge=first_game_badge).exists()
        # Check if the user has played at least one game
        if not has_badge and Result.objects.filter(user=user).count() >= 1:
            UserBadge.objects.create(user=user, badge=first_game_badge)
            awarded_badges.append(first_game_badge)
    except Badge.DoesNotExist:
        # Badge hasn't been created in the DB yet, so we can't award it.
        pass

    # Add logic for more complex badges here
    # e.g., "Math Whiz" - 5 perfect scores in Math
    
    return awarded_badges


@transaction.atomic
def calculate_score_and_xp(user: User, game: Game, answers: list, time_taken: int):
    """
    Calculates the score and XP for a game submission, updates user stats,
    and checks for new badges.
    """
    score = 0
    points_per_question = game.config.get('points_per_question', 10)

    # Basic scoring for Multiple Choice Questions (MCQ)
    if game.game_type == Game.GameType.MULTIPLE_CHOICE:
        questions = list(game.questions.all())
        for i, question in enumerate(questions):
            # Ensure we don't go out of bounds if the user submits fewer answers
            if i < len(answers):
                user_answer_index = answers[i]
                correct_answer_index = question.answer.get('correct_index')
                if user_answer_index == correct_answer_index:
                    score += points_per_question

    # Add scoring logic for other game types (FIB, SEQ) here...
    
    # Calculate XP (simple formula: score * multiplier)
    xp_earned = score * 2

    # Add a time bonus (example: +10 XP if finished under 60 seconds)
    if time_taken < 60:
        xp_earned += 10
    
    # Create the result record
    result = Result.objects.create(
        user=user,
        game=game,
        score=score,
        xp_earned=xp_earned,
        time_taken=time_taken,
        metadata={'answers': answers}
    )

    # Update user's total XP and check for level up
    user.xp += xp_earned
    update_user_level(user)
    user.save()

    # Check for any new badges earned
    newly_awarded_badges = check_and_award_badges(user)

    return result, newly_awarded_badges