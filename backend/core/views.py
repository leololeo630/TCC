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
from rest_framework.decorators import api_view, permission_classes


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
            return Historico.objects.filter(user=profile)
        
        return Historico.objects.filter(user=profile)

    def perform_create(self, serializer):
        user = self.request.user
        profile = getattr(user, 'profile', None)
        if profile and profile.role == 'admin':
            serializer.save()
        else:
            serializer.save(user=profile)

# views.py
@api_view(['GET'])
@permission_classes([IsOwnerOrAdmin])
def desempenho_usuario(request):
    user = request.user
    profile = getattr(user, 'profile', None)
    # Filtra histórico do usuário
    historico = Historico.objects.filter(user=profile)

    # Dicionário para organizar os dados
    resultado = {}

    for h in historico.select_related('questao__assunto__disciplina'):
        disciplina = h.questao.assunto.disciplina
        assunto = h.questao.assunto

        if disciplina.nome not in resultado:
            resultado[disciplina.nome] = {}

        if assunto.nome not in resultado[disciplina.nome]:
            resultado[disciplina.nome][assunto.nome] = {"acertos": 0, "erros": 0}

        if h.resolvida:
            resultado[disciplina.nome][assunto.nome]["acertos"] += 1
        else:
            resultado[disciplina.nome][assunto.nome]["erros"] += 1

    # Transformar em lista no formato que você quer
    data = []
    for disc_name, assuntos_dict in resultado.items():
        assuntos_list = []
        for assunto_name, valores in assuntos_dict.items():
            assuntos_list.append({
                "nome": assunto_name,
                "acertos": valores["acertos"],
                "erros": valores["erros"]
            })
        data.append({
            "disciplina": disc_name,
            "assuntos": assuntos_list
        })

    return Response(data)
