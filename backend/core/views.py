from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Disciplina, Assunto, Questao, Alternativa, Historico
from .serializers import (
    DisciplinaSerializer, AssuntoSerializer, QuestaoSerializer,
    AlternativaSerializer, HistoricoSerializer
)
from .permissions import IsAdminOrReadyOnly, IsOwnerOrAdmin

class DisciplinaViewSet(ModelViewSet):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAdminOrReadyOnly]

class AssuntoViewSet(ModelViewSet):
    queryset = Assunto.objects.all()
    serializer_class = AssuntoSerializer
    permission_classes = [IsAdminOrReadyOnly]

class QuestaoViewSet(ModelViewSet):
    queryset = Questao.objects.all()
    serializer_class = QuestaoSerializer
    permission_classes = [IsAdminOrReadyOnly]

class AlternativaViewSet(ModelViewSet):
    queryset = Alternativa.objects.all()
    serializer_class = AlternativaSerializer
    permission_classes = [IsAdminOrReadyOnly]

class HistoricoViewSet(ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        profile = getattr(user, 'profile', None)

        if profile and profile.role == 'admin':
            return Historico.objects.all()
        
        return Historico.objects.filter(user=profile)

    def perform_create(self, serializer):
        user = self.request.user
        profile = getattr(user, 'profile', None)
        if profile and profile.role == 'admin':
            serializer.save()
        else:
            serializer.save(user=profile)