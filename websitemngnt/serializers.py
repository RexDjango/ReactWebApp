from rest_framework import serializers
from .models import commenter
import datetime


class CommenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = commenter
        fields = ['id', 'fullname', 'email', 'status', 'timestamp', 'contact']


class CommenterDisplaySerializer(serializers.ModelSerializer):
    formattimestamp = serializers.SerializerMethodField()

    class Meta:
        model = commenter
        fields = ['id', 'fullname', 'email', 'status',
                  'timestamp', 'contact', 'formattimestamp']

    def get_formattimestamp(self, obj):
        dtime = obj.timestamp.date()
        formattimestamp = dtime.strftime('%m/%d/%Y')
        return formattimestamp
