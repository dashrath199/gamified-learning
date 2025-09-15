import random
from django.core.management.base import BaseCommand
from django.db import transaction
from django.contrib.auth import get_user_model
from apps.grades.models import Grade
from apps.subjects.models import Subject
from apps.games.models import Game, Question
from apps.progress.models import Badge, Result

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with demo data for the Gamified Learning platform.'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting existing data...")
        User.objects.exclude(is_superuser=True).delete()
        Grade.objects.all().delete()
        # ... delete other models ...

        self.stdout.write("Seeding data...")

        # Create Grades
        grades = [Grade.objects.create(name=str(i), display_name=f"Grade {i}", order=i) for i in range(6, 13)]

        # Create Subjects
        subjects_data = [
            {"name": "Mathematics", "icon": "🔢"},
            {"name": "Science", "icon": "🔬"},
            {"name": "English", "icon": "📚"},
        ]
        math, science, english = [Subject.objects.create(**data) for data in subjects_data]
        for s in [math, science, english]:
            s.grades.set(grades)

        # Create Users
        User.objects.create_superuser('admin@example.com', 'adminpass', full_name="Admin User")
        User.objects.create_user('teacher@example.com', 'teacherpass', role=User.Role.TEACHER, full_name="Teacher User")
        for grade in grades:
             for i in range(1, 6):
                User.objects.create_user(
                    f'student_{grade.name}_{i}@example.com', 'studentpass',
                    full_name=f"Student {grade.name}-{i}", grade=grade, xp=random.randint(50, 5000)
                )
        
        # Create Games and Questions (example for Math)
        math_game = Game.objects.create(
            title="Algebra Basics", subject=math, game_type=Game.GameType.MULTIPLE_CHOICE,
            config={"time_limit": 300, "points_per_question": 10}
        )
        for i in range(1, 11):
            Question.objects.create(
                game=math_game, prompt=f"What is {i} + {i+1}?",
                options=[i*2, (i*2)+1, (i*2)-1], answer={"correct_index": 1}
            )

        # ... Create more games for Science, English ...

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database!'))