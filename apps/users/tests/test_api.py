import pytest
from django.urls import reverse
from rest_framework import status
from .factories import UserFactory, GradeFactory

pytestmark = pytest.mark.django_db

def test_user_registration(api_client):
    grade = GradeFactory()
    url = reverse('auth_register')
    data = {
        'email': 'test@example.com',
        'password': 'strongpassword123',
        'full_name': 'Test User',
        'grade_id': grade.id
    }
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['email'] == data['email']

def test_user_login(api_client, user_factory):
    user = user_factory(password='testpass123')
    url = '/api/v1/auth/login/' #reverse('token_obtain_pair')#    
    data = {'email': user.email, 'password': 'testpass123'}
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data
    assert 'refresh' in response.data

def test_game_submission_flow(api_client, user_factory, game_factory):
    user = user_factory()
    api_client.force_authenticate(user=user)
    game = game_factory() # Assume this factory also creates questions
    
    url = reverse('game-submit', kwargs={'pk': game.pk})
    submission_data = {
        'answers': [1, 0, 1], # Example answers
        'time_taken': 150
    }
    
    response = api_client.post(url, submission_data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'score' in response.data
    assert 'xp_earned' in response.data
    
    user.refresh_from_db()
    assert user.xp > 0