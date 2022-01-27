from django.shortcuts import render, redirect

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from ..serializers import SaveServicesSerializer, DisplayServicesSerializer
from ..models import services


@api_view(['GET'])
def servicelist_view(request, *args, **kwargs):
    servicelist = services.objects.filter(tags='laboratory')
    if servicelist.exists():
        serializer = DisplayServicesSerializer(servicelist, many=True)
        context = {"servicelist": serializer.data}
        return Response(context, status=200)
    return Response({}, status=404)


@api_view(['GET', 'POST'])
def createservice_view(request, *args, **kwargs):
    myserializer = SaveServicesSerializer(data=request.data)
    if myserializer.is_valid(raise_exception=True):
        myserializer.save()

    servicelist = services.objects.filter(tags='laboratory')
    if servicelist.exists():
        serializer = DisplayServicesSerializer(servicelist, many=True)
        context = {"servicelist": serializer.data}
        return Response(context, status=200)
    return Response({}, status=404)
