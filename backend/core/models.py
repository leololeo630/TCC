from django.db import models
from accounts.models import Profile
# Create your models here.

class Disciplina(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Assunto(models.Model):
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Questao(models.Model):
    DIFICULDADE_CHOICES = (
        ('facil', 'Fácil'),
        ('medio', 'Médio'),
        ('dificil', 'Difícil'),
    )
    assunto = models.ForeignKey(Assunto, on_delete=models.CASCADE)
    texto = models.TextField()
    dificuldade = models.CharField(max_length=10, choices=DIFICULDADE_CHOICES)

    def __str__(self):
        return self.texto[:50]

class Alternativa(models.Model):
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    texto = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.texto[:50]

class Historico(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    resolvida = models.BooleanField()

    def __str__(self):
        return f"{self.user.user.username} - {self.questao.texto[:30]} - {'Correta' if self.resolvida else 'Incorreta'}"