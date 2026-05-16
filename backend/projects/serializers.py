from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, ProjectMember

class ProjectMemberSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = ProjectMember
        fields = ('id', 'user_id', 'username','role')

class ProjectSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    members = ProjectMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'description', 'created_by_username', 'members', 'created_at')
