from django.urls import path, include
from blog.api.views import savecomment_view, commentlist_view

urlpatterns = [
    path('savecomment/', savecomment_view),
    path('commentviewlist/', commentlist_view),
]
