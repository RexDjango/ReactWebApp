from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from adminmanagement.models import posts
from adminmanagement.serializers import PostRelationSerializer

# Create your views here.


def blogmain_view(request):
    return render(request, 'blog/main.html')


def blog_detail_view(request, pk):
    blog = posts.objects.get(id=pk)
    serializer = PostRelationSerializer(blog)
    context = {'blog': serializer.data, 'action': '/api/savecomment/'}
    return render(request, 'blog/blogdetail.html', context)
