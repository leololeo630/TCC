from django.contrib import admin
from .models import Disciplina, Assunto, Questao, Alternativa, Historico
from accounts.models import Profile
# Register your models here.
admin.site.register(Disciplina)
admin.site.register(Assunto)
admin.site.register(Questao)
admin.site.register(Alternativa)
admin.site.register(Historico)
admin.site.register(Profile)