from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Project, ProjectMember
from .serializers import ProjectSerializer, ProjectMemberSerializer

class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(members__user=self.request.user)

    def perform_create(self, serializer):
        project = serializer.save(created_by=self.request.user)
        ProjectMember.objects.create(project=project, user=self.request.user, role='admin')

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(members__user=self.request.user)

class ProjectMemberView(APIView):
    def is_admin(self, project, user):
        return ProjectMember.objects.filter(project=project, user=user, role='admin').exists()

    def post(self, request, project_id):
        project = Project.objects.get(id=project_id)
        if not self.is_admin(project, request.user):
            return Response({'detail': 'Not authorized'}, status=403)
        username = request.data.get('username')
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=404)
        member, created = ProjectMember.objects.get_or_create(project=project, user=user)
        if not created:
            return Response({'detail': 'Already a member'}, status=400)
        return Response(ProjectMemberSerializer(member).data, status=201)

    def delete(self, request, project_id, user_id):
        project = Project.objects.get(id=project_id)
        if not self.is_admin(project, request.user):
            return Response({'detail': 'Not authorized'}, status=403)
        ProjectMember.objects.filter(project=project, user_id=user_id).delete()
        return Response(status=204)
