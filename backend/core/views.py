from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Disciplina, Assunto, Questao, Alternativa, Historico
from .serializers import (
    DisciplinaSerializer, AssuntoSerializer, QuestaoSerializer,
    AlternativaSerializer, HistoricoSerializer
)
from .permissions import IsAdminOrReadyOnly, IsOwnerOrAdmin
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

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
    @action(detail=False, methods=['get'], url_path='next')
    def next(self, request):
        last_id = request.query_params.get('last_id')
        if not last_id:
            return Response({"detail": "last_id parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        try: 
            atual_questao = Questao.objects.get(id=last_id)
        except Questao.DoesNotExist:
            return Response({"detail": "Questao not found."}, status=status.HTTP_404_NOT_FOUND)
        
        user = request.user.profile
        questoes_respondidas = Historico.objects.filter(user=user).values_list('questao_id', flat=True)

        questao = (
            Questao.objects
            .filter(assunto=atual_questao.assunto, dificuldade=atual_questao.dificuldade)
            .exclude(id__in=questoes_respondidas)
            .exclude(id=atual_questao.id)
            .order_by('id')
            .first()
        )
        if questao:
            serializer = self.get_serializer(questao)
            return Response(serializer.data)
        
        questao = (
            Questao.objects
            .filter(assunto=atual_questao.assunto)
            .exclude(id__in=questoes_respondidas)
            .exclude(id=atual_questao.id)
            .order_by('id')
            .first()
        )
        if questao:
            serializer = self.get_serializer(questao)
            return Response(serializer.data)
        
        questao = (
            Questao.objects
            .filter(assunto__disciplina=atual_questao.assunto.disciplina)
            .exclude(id__in=questoes_respondidas)
            .exclude(id=atual_questao.id)
            .order_by('id')
            .first()
        )
        if questao:
            serializer = self.get_serializer(questao)
            return Response(serializer.data)
        
        questao = (
            Questao.objects
            .exclude(id=atual_questao.id)
            .order_by('id')
            .first()
        ) 
        return Response(self.get_serializer(questao).data) if questao else Response({"detail": "No more questions available."}, status=status.HTTP_404_NOT_FOUND)

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