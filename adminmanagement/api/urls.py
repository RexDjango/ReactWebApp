from django.urls import path, include
from adminmanagement.api.views import (
    dashboard_view, postlist_view, post_tags_view,
    createpost_view, gallerylist_view, creategallery_view,
    updatepost_view, deletepost_view, postcount_view,
    gallerydelete_view, commenterdelete_view, bloglist_view,
    blogdetail_view, newuser_view, profile_view,gallerycreate_view
)

urlpatterns = [
    path('dashposts/', dashboard_view, name="dashboard"),
    path('postlist/', postlist_view, name="post-list"),
    path('gallerylist', gallerylist_view, name="gallery-list"),
    path('posttags/', post_tags_view, name="post-tags"),
    path('post-count/', postcount_view, name="post-count"),

    path('create-article/', createpost_view, name="create-post"),
    path('update-article/', updatepost_view, name="update-post"),
    path('post-delete/', deletepost_view, name="delete-post"),

    path('create-gallery/', creategallery_view),
    path('gallerydelete/', gallerydelete_view),
    path('commeterdelete/', commenterdelete_view),

    path('bloglist/', bloglist_view),
    path('blogdetail/', blogdetail_view),
    path('create-user/', newuser_view),
    path('profilelist/', profile_view),
]
