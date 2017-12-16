from django.db import models
from django.contrib import admin


class Choices(models.Model):
    data_created = models.DateTimeField(name="created")
    seed = models.CharField(max_length=5, name="seed")

    def __str__(self):
        return self.seed


class Choice(models.Model):
    text = models.CharField(max_length=256, name="text")
    probability = models.DecimalField(max_digits=32, decimal_places=32)
    parent = models.ForeignKey(Choices, on_delete=models.CASCADE, default=0)

    def __str__(self):
        return self.text


admin.site.register(Choice)
admin.site.register(Choices)
