from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from django.utils import timezone
from projects.models import Project, ProjectMember
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        user = self.request.user
        is_member = ProjectMember.objects.filter(project_id=project_id, user=user).exists()
        if not is_member:
            return Task.objects.none()
        is_admin = ProjectMember.objects.filter(project_id=project_id, user=user, role='admin').exists()
        if is_admin:
            return Task.objects.filter(project_id=project_id)
        return Task.objects.filter(project_id=project_id, assigned_to=user)

    def perform_create(self, serializer):
        project = Project.objects.get(id=self.kwargs['project_id'])
        serializer.save(created_by=self.request.user, project=project)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(project__members__user=self.request.user)

class DashboardView(APIView):
    def get(self, request):
        user_projects = ProjectMember.objects.filter(user=request.user).values_list('project_id', flat=True)
        tasks = Task.objects.filter(project_id__in=user_projects)
        today = timezone.now().date()
        return Response({
            'total_tasks': tasks.count(),
            'by_status': list(tasks.values('status').annotate(count=Count('id'))),
            'by_user': list(tasks.values('assigned_to__username').annotate(count=Count('id'))),
            'overdue': tasks.filter(due_date__lt=today).exclude(status='done').count(),
        })
