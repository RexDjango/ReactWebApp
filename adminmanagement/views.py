from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib.auth.decorators import login_required
from .forms import PostForm

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics

from accounts.decorators import allowed_users, admin_only
from .serializers import CommentsSerializer, MessageSerializer, PostSerializer, PostTagSerializer, PostRelationSerializer, TagSerializer, GalleryEditSerializer
from .models import comments, messages, articletags, posts, tags, profile
from websitemngnt.models import gallery
from .forms import SomeForm, ProfileForm


@login_required(login_url='login')
def home_view(request):
    context = {'postcount': request.session.get('postcount', 0)}
    return render(request, 'pages/dashboard.html', context)


@api_view(['GET'])
def post_edit_view(request, pk):
    post = posts.objects.get(id=pk)
    serializer = PostRelationSerializer(post, many=False)
    articletag = articletags.objects.filter(toarticletag__id=pk)
    serializer1 = PostTagSerializer(articletag, many=True)
    articletag1 = articletags.objects.exclude(toarticletag__id=pk)
    serializer2 = PostTagSerializer(articletag1, many=True)
    context = {'post': serializer.data, "posttag": serializer1.data,
               "posttaglist": serializer2.data, "btnname": "Update", "action": "/api/update-article/", 'postcount': request.session.get('postcount', 0)}
    return render(request, 'pages/article.html', context)


def post_view(request):
    form = SomeForm()
    taglist = articletags.objects.all()
    if not taglist.exists():
        Http404
    serializer = PostTagSerializer(taglist, many=True)
    context = {"posttaglist": serializer.data,
               'btnname': 'save', 'action': "/api/create-article/", 'postcount': request.session.get('postcount', 0), "content": form}
    return render(request, 'pages/article.html', context)


def post_detail_view(request, pk):
    pass


@api_view(['POST'])
def post_delete_view(request, pk):
    postId = request.POST.get(pk) or None
    post = posts.objects.get(id=postId)
    post.delete()
    return redirect('/api/post/')


def articlelist_view(request):
    context = {'postcount': request.session.get('postcount', 0)}
    return render(request, 'pages/view-articles.html', context)


def tags_view(request):
    return render(request, 'pages/tags.html')


def comment_view(request):
    context = {'postcount': request.session.get('postcount', 0)}
    return render(request, 'pages/approved.html', context)


def approved_comment_view(request):
    context = {'postcount': request.session.get('postcount', 0)}
    return render(request, 'pages/approved.html', context)


def unapprove_comment_view(request):
    context = {'postcount': request.session.get('postcount', 0)}
    return render(request, 'pages/unapprove.html', context)


def gallery_view(request):
    return render(request, 'pages/gallery.html')


@api_view(['GET'])
def galleryedit_view(request, pk):
    gallery_id = gallery.objects.get(id=pk)
    serializer = GalleryEditSerializer(gallery_id, many=False)
    context = {'gallery': serializer.data}
    return render(request, "pages/gallery.html", context)


def admin_doctors_view(request):
    return render(request, 'pages/doctor.html')


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("login?next=/accounts/login")
    user = request.user
    my_profile = user.profile
    form = ProfileForm(request.POST or None, instance=my_profile)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get("last_name")
        email_address = form.cleaned_data.get("email_address")
        user.first_name = first_name
        user.last_name = last_name
        user.email_address = email_address
        user.save()
        profile_obj.save()
    context = {
        "form": form,
        "btn_label": "Save",
        "title": "Update Profile"
    }
    return render(request, "profiles/form.html", context)


def admin_setting_view(request, *args, **kwargs):
    return render(request, "pages/settings.html")


def users_view(request, *args, **kwargs):
    return render(request, "pages/users.html")
