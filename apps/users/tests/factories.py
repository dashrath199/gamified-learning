import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model
from apps.grades.models import Grade
from apps.subjects.models import Subject
from apps.games.models import Game, Question

User = get_user_model()

class GradeFactory(DjangoModelFactory):
    class Meta:
        model = Grade

    name = factory.Sequence(lambda n: str(n + 6))
    display_name = factory.LazyAttribute(lambda obj: f"Grade {obj.name}")
    order = factory.Sequence(lambda n: n)

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f'student{n}@example.com')
    full_name = factory.Faker('name')
    role = User.Role.STUDENT
    grade = factory.SubFactory(GradeFactory)
    
    # This ensures a password is set but not returned in queries
    @factory.post_generation
    def password(self, create, extracted, **kwargs):
        if not create:
            return
        # A default password if none is provided
        self.set_password(extracted or 'defaultpassword')
        self.save()


class SubjectFactory(DjangoModelFactory):
    class Meta:
        model = Subject
    
    name = factory.Iterator(['Mathematics', 'Science', 'English'])

class GameFactory(DjangoModelFactory):
    class Meta:
        model = Game
    
    title = factory.Faker('catch_phrase')
    subject = factory.SubFactory(SubjectFactory)
    game_type = Game.GameType.MULTIPLE_CHOICE
    is_active = True

class QuestionFactory(DjangoModelFactory):
    class Meta:
        model = Question
    
    game = factory.SubFactory(GameFactory)
    prompt = factory.Faker('sentence')
    options = ['Option A', 'Option B', 'Option C']
    answer = {'correct_index': 1}