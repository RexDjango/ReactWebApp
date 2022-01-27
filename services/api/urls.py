from django.urls import path, re_path
from .views import servicelist_view, createservice_view

urlpatterns = [
    path('laboratory/', servicelist_view, name="laboratory"),
    path('create-laboratory/', createservice_view, name="create-laboratory"),
]
