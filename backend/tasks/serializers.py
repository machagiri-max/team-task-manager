from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'status', 'priority',
                  'due_date', 'assigned_to', 'assigned_to_username',
                  'created_by_username', 'created_at', 'project')
        read_only_fields = ('created_by', 'project')
