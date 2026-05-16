from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView, ProjectMemberView

urlpatterns = [
    path('projects/', ProjectListCreateView.as_view()),
    path('projects/<int:pk>/', ProjectDetailView.as_view()),
    path('projects/<int:project_id>/members/', ProjectMemberView.as_view()),
    path('projects/<int:project_id>/members/<int:user_id>/', ProjectMemberView.as_view()),
]
