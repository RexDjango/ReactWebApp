from rest_framework import serializers
from .models import services


class SaveServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = services
        fields = ['id', 'shortdescrip', 'longdescrip', 'price', 'edate']


class DisplayServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = services
        fields = ['id', 'shortdescrip', 'longdescrip', 'price', 'edate']
