from django.urls import include, path
from .views import blog_detail_view, blogmain_view

urlpatterns = [
    path('', blogmain_view, name="blog_main"),
    path('blogdetail/<str:pk>', blog_detail_view, name="blog_detail"),
]
