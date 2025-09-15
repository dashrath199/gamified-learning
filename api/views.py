from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets, status
# ADD 'AllowAny' to this import line
from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import (
    RegisterSerializer, UserSerializer, GradeSerializer, SubjectSerializer, 
    GameSerializer, GameSubmissionSerializer, LeaderboardUserSerializer,
    UserProgressSerializer
)
from apps.grades.models import Grade
from apps.subjects.models import Subject
from apps.games.models import Game
from apps.progress.services import calculate_score_and_xp, check_and_award_badges
from apps.progress.models import UserBadge, Result


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # This is already public, which is correct
    serializer_class = RegisterSerializer

class GradeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    # ADD THIS LINE to make the grades list public
    permission_classes = [AllowAny] 

class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SubjectSerializer
    # This endpoint requires login, which is correct
    
    def get_queryset(self):
        queryset = Subject.objects.all()
        grade_id = self.request.query_params.get('grade_id')
        if grade_id:
            queryset = queryset.filter(grades__id=grade_id)
        return queryset.distinct()

class GameViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GameSerializer
    # This endpoint requires login, which is correct

    def get_queryset(self):
        queryset = Game.objects.filter(is_active=True)
        subject_id = self.request.query_params.get('subject_id')
        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)
        return queryset

    @action(detail=True, methods=['post'], serializer_class=GameSubmissionSerializer)
    def submit(self, request, pk=None):
        game = self.get_object()
        serializer = GameSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            result_data, awarded_badges = calculate_score_and_xp(
                user=request.user,
                game=game,
                answers=serializer.validated_data['answers'],
                time_taken=serializer.validated_data['time_taken']
            )
            # Award badges if any
            for badge in awarded_badges:
                UserBadge.objects.get_or_create(user=request.user, badge=badge)
            
            return Response({
                'score': result_data.score,
                'xp_earned': result_data.xp_earned,
                'new_level': request.user.level,
                'awarded_badges': [b.name for b in awarded_badges],
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LeaderboardUserSerializer
    # This endpoint requires login, which is correct

    def get_queryset(self):
        queryset = User.objects.filter(role=User.Role.STUDENT).order_by('-xp')
        grade_id = self.request.query_params.get('grade_id')
        if grade_id:
            queryset = queryset.filter(grade_id=grade_id)
        return queryset[:20] # Top 20

class UserProgressView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    # This endpoint requires login, which is correct

    def get(self, request, *args, **kwargs):
        user = request.user
        results = Result.objects.filter(user=user).order_by('-created_at')[:10]
        badges = UserBadge.objects.filter(user=user)
        
        serializer = UserProgressSerializer({
            'user': user,
            'results': results,
            'badges': badges
        })
        return Response(serializer.data)