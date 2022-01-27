from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics, serializers
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from accounts.decorators import allowed_users, admin_only
from ..serializers import (
    PostActionSerializer, CommentsSerializer,
    MessageSerializer, PostSerializer, PostTagSerializer,
    PostRelationSerializer, TagSerializer, GallerySerializer,
    GalleryEditSerializer, ActionSerializer, CommentDisplaySerializer,
    BlogTagSerializer,GalleryUploadSeralizer, UserProfileSerializer, ProfileDisplaySerializer)
from ..models import comments, messages, articletags, posts, tags, profile
from websitemngnt.serializers import CommenterDisplaySerializer
from websitemngnt.models import gallery, commenter
from accounts.decorators import unauthenticated_user
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.response import Response
from rest_framework import viewsets
from django.http import HttpResponse

class gallerycreate_view(viewsets.ModelViewSet):
    queryset=gallery.objects.all()
    serializers_class=GalleryUploadSeralizer

    def post(request,*args,**kwargs):
        print("<<---view request",request.data)
        picture=request.data['picture']
        title=request.data['title']
        discrip=request.data['descrip']
        gallery.objects.create(title=title,picture=picture,discrip=discrip)
        return Response({'message':'Book created'},status=200)

@api_view(['GET'])
def dashboard_view(request):
    post = posts.objects.all()[:5]
    message = messages.objects.all()
    comment = comments.objects.all()[:2]
    commenters = commenter.objects.all()[:2]

    postserializers = PostRelationSerializer(post, many=True)
    commentserializers = CommentDisplaySerializer(comment, many=True)
    messageserializers = MessageSerializer(message, many=True)
    commenterserializer = CommenterDisplaySerializer(commenters, many=True)

    postcount = posts.objects.all().count()
    request.session['postcount'] = postcount

    context = {"comments": commentserializers.data,
               "messages": messageserializers.data,
               "post": postserializers.data,
               "commenter": commenterserializer.data
               }
    return Response(context, status=200)


@api_view(['GET'])
def postlist_view(request):
    postlist = posts.objects.all()
    serializer = PostRelationSerializer(postlist, many=True)
    context = {'postlist': serializer.data}
    return Response(context, status=200)


@api_view(['GET'])
def post_tags_view(request):
    taglist = articletags.objects.all()
    if not taglist.exists():
        Http404
    serializer = PostTagSerializer(taglist, many=True)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def createpost_view(request, *args, **kwargs):
    print("create post", request.data)
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return redirect('/myadmin/')
    return Response({}, status=400)


@api_view(['POST'])
def updatepost_view(request, *args, **kwargs):
    postId = request.POST.get('postId') or None
    post = posts.objects.get(id=postId)
    print("post update", post)
    serializer = PostSerializer(instance=post, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return redirect('/myadmin/')
    return Response({}, status=400)


@api_view(['DELETE', 'POST'])
def deletepost_view(request, *args, **kwargs):
    print('request.data', request.data)
    serializer = PostActionSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id = data.get("id")
        action = data.get("action")
        content = data.get("content")

    qs = posts.objects.filter(id=post_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    obj.delete()

    postlist = posts.objects.all()
    serializer = PostRelationSerializer(postlist, many=True)
    postcount = posts.objects.all().count()
    request.session['postcount'] = postcount
    context = {'postlist': serializer.data}
    return Response(context, status=200)


@api_view(['GET'])
def postcount_view(request, *args, **kwargs):
    postcount = posts.objects.all().count()
    context = {'postcount': postcount}
    return Response(context, status=200)

@api_view(['POST'])
def creategallery_view(request, *args, **kwargs):
    data={'title':request.POST.get('title'),'discrip':request.POST.get('discrip'),'picture':request.FILES.get('picture')}
    serializer = GallerySerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        context={"newgallery":serializer.data}
        print("<---newgallery",context)
        return Response(context, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def gallerylist_view(request, *args, **kwargs):
    gallerylist = gallery.objects.all()
    serializers = GallerySerializer(gallerylist, many=True)
    context = {"gallerylist": serializers.data}
    return Response(context, status=200)


@api_view(['POST'])
def gallerydelete_view(request, *args, **kwargs):
    serializer = ActionSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        galleryId = data.get('id')
        action = data.get('action')

    qs = gallery.objects.filter(id=galleryId)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    obj.delete()

    gallerylist = gallery.objects.all()
    serializer1 = GallerySerializer(gallerylist, many=True)
    context = {"gallerylist": serializer1.data}
    return Response(context, status=200)


@api_view(['POST'])
def commenterdelete_view(request, *args, **kwargs):
    serializer = ActionSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        commenterId = data.get("id")
        action = data.get("action")

    qs = commenter.objects.filter(id=commenterId)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    obj.delete()

    commenterlist = commenter.objects.all()
    serializer1 = CommenterDisplaySerializer(commenterlist, many=True)
    context = {"commenterlist": serializer1.data}
    return Response(context, status=200)


@api_view(['GET'])
def bloglist_view(request):
    postlist = posts.objects.all()
    serializer = PostRelationSerializer(postlist, many=True)
    context = {'bloglist': serializer.data}
    return Response(context, status=200)


@api_view(['GET', 'POST'])
def blogdetail_view(request, *args, **kwargs):
    serializer = ActionSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        blogId = data.get('id')
        action = data.get("action")

    qs = posts.objects.get(id=blogId)
    serializer1 = PostRelationSerializer(qs, many=False)

    context = {"blog": serializer1.data}
    return Response(context, status=200)


@api_view(['GET', 'POST'])
def newuser_view(request, *args, **kwargs):
    user = request.data
    print(request.data)
    username = user.get('username')
    password = user.get('password')
    email = user.get('email')
    firstname = user.get('firstname')
    lastname = user.get('lastname')
    status = user.get('status')
    if status == "false":
        status = False
    else:
        status = True
    save_user = User.objects.create_user(username, email, password)
    save_user.last_name = lastname
    save_user.first_name = firstname
    save_user.save()

    qs = profile.objects.filter(user__username=username)
    print('qs', qs.first())
    if not qs.exists():
        raise Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    print('profile_obj', profile_obj)

    serializer = UserProfileSerializer(
        instance=profile_obj.id, data=request.data)
    if serializer.is_valid(raise_exception=True):
        print("username", serializer.data)
        serializer.save()

    profilelist = profile.objects.all()
    print('profilelist', profilelist)
    serializer = ProfileDisplaySerializer(profilelist, many=True)
    context = {"profilelist": serializer.data}
    return Response(context, status=200)


@api_view(['GET'])
def profile_view(request, *args, **kwargs):
    profilelist = profile.objects.all()
    serializer = ProfileDisplaySerializer(profilelist, many=True)
    context = {"profilelist": serializer.data}
    return Response(context, status=200)
