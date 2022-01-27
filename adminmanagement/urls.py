from django.urls import path, include
from .views import (
    home_view, post_view,
    tags_view, comment_view,
    articlelist_view, post_edit_view,
    post_detail_view, post_delete_view,
    approved_comment_view, unapprove_comment_view,
    gallery_view, galleryedit_view, admin_doctors_view, profile_update_view,
    admin_setting_view, users_view
)

urlpatterns = [
    path('', home_view, name="home"),
    path('post/', post_view, name='post'),
    path('posts-edit/<str:pk>/',
         post_edit_view, name="post-detail"),
    path('posts-delete/<str:pk>/',
         post_delete_view, name="post-delete"),
    path('viewarticle/posts-view/<str:pk>/',
         post_detail_view, name='post-list'),
    path('viewarticle/posts-delete/<str:pk>/',
         post_delete_view, name='post-delete'),
    path('viewarticle/', articlelist_view, name="view-article"),
    path('tags/', tags_view, name='tags'),
    path('comments/', comment_view, name='comment'),
    path('gallery/', gallery_view, name='gallery'),
    path('gallery-edit/<str:pk>/', galleryedit_view, name="gallery-edit"),
    path('approved-comment/', approved_comment_view, name='approved-comment'),
    path('unapprove-comment/', unapprove_comment_view, name='unapprove-comment'),
    path('doctors/', admin_doctors_view, name="doctors"),
    path('settings/', admin_setting_view, name="settings"),
    path('edit/', profile_update_view),
    path('users/', users_view, name="users"),
]
