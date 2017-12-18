from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader


def index(request):
    return HttpResponse("Hello, world")


def new(request):
    context = {
        'w': 'w',
    }
    return render(request, 'main/index.html', context)
