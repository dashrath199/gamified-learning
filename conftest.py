import pytest
from rest_framework.test import APIClient
from apps.users.tests.factories import UserFactory, GradeFactory, GameFactory, QuestionFactory

@pytest.fixture
def api_client():
    """A fixture that provides an instance of DRF's APIClient."""
    return APIClient()

@pytest.fixture
def user_factory(db):
    """A fixture that provides access to the UserFactory."""
    return UserFactory

@pytest.fixture
def grade_factory(db):
    """A fixture that provides access to the GradeFactory."""
    return GradeFactory
    
@pytest.fixture
def game_factory(db):
    """A fixture that provides access to the GameFactory."""
    return GameFactory

@pytest.fixture
def question_factory(db):
    """A fixture that provides access to the QuestionFactory."""
    return QuestionFactory