from rest_framework import serializers
from .models import Disciplina, Assunto, Questao, Alternativa, Historico
from accounts.models import Profile

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = ['id', 'nome']

class AssuntoSerializer(serializers.ModelSerializer):
    disciplina = serializers.PrimaryKeyRelatedField(queryset=Disciplina.objects.all())
    class Meta:
        model = Assunto
        fields = ['id', 'nome', 'disciplina'] 
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['disciplina'] = DisciplinaSerializer(instance.disciplina).data
        return rep


class AlternativaSerializer(serializers.ModelSerializer):
    questao = serializers.PrimaryKeyRelatedField(
        queryset=Questao.objects.all(),
        write_only=True
        )
    
    class Meta:
        model = Alternativa
        fields = ['id', 'texto', 'is_correct']

class QuestaoSerializer(serializers.ModelSerializer):
    assunto = serializers.PrimaryKeyRelatedField(queryset=Assunto.objects.all())
    alternativas = AlternativaSerializer(
        many=True,
        read_only=True,
        source='alternativa_set'
    )
    class Meta:
        model = Questao
        fields = ['id', 'texto', 'dificuldade', 'assunto', 'alternativas']
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['assunto'] = AssuntoSerializer(instance.assunto).data
        return rep
 
class HistoricoSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
    questao = serializers.PrimaryKeyRelatedField(queryset=Questao.objects.all())

    class Meta:
        model = Historico
        fields = ['id', 'user', 'questao', 'resolvida']
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['questao'] = QuestaoSerializer(instance.questao).data
        return rep
