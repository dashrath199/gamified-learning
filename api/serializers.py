from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.grades.models import Grade
from apps.subjects.models import Subject
from apps.games.models import Game, Question
from apps.progress.models import Result, Badge, UserBadge

User = get_user_model()

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'name', 'display_name']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    grade_id = serializers.PrimaryKeyRelatedField(
        queryset=Grade.objects.all(), source='grade', write_only=True
    )

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'full_name', 'grade_id')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            grade=validated_data['grade']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    grade = GradeSerializer()
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'role', 'grade', 'xp', 'level']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'description', 'icon']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'prompt', 'options', 'hint', 'difficulty'] # Exclude answer

class GameSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'subject', 'description', 'game_type', 'config', 'questions']

class ResultSerializer(serializers.ModelSerializer):
    game = GameSerializer(read_only=True)
    class Meta:
        model = Result
        fields = '__all__'
        
class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'description', 'icon']

class UserBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer()
    class Meta:
        model = UserBadge
        fields = ['badge', 'awarded_at']

class UserProgressSerializer(serializers.Serializer):
    user = UserSerializer()
    results = ResultSerializer(many=True)
    badges = UserBadgeSerializer(many=True)

class GameSubmissionSerializer(serializers.Serializer):
    answers = serializers.JSONField()
    time_taken = serializers.IntegerField(min_value=0)

class LeaderboardUserSerializer(serializers.ModelSerializer):
    grade_name = serializers.CharField(source='grade.display_name', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'full_name', 'xp', 'level', 'grade_name']