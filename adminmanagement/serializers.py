from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.timezone import now
import datetime

from .models import (
    posts, articletags, comments, messages, tags, profile
)
from websitemngnt.models import gallery

POST_ACTION_OPTIONS = settings.POST_ACTION_OPTIONS

class PostActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validation_action(self, value):
        value = value.lower().strip()
        if not value in POST_ACTION_OPTIONS:
            raise serializers.ValidationError('this is not valid action.')
        return value


class ActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()

    def validation_action(self, value):
        value = value.lower().strip()
        if not value in POST_ACTION_OPTIONS:
            raise serializers.ValidationError('this is not valid action.')
        return value


class PostSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = posts
        fields = ['id', 'title', 'timestamp',
                  'content', 'user', 'tags', 'picture', 'descrip']

    def get_timestamp(self, obj):
        timestamp = obj.timestamp.date()
        return timestamp


class PostRelationSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()
    reply = serializers.SerializerMethodField(read_only=True)
    postcount = serializers.SerializerMethodField(read_only=True)
    picture = serializers.SerializerMethodField(read_only=True)
    dtime = serializers.SerializerMethodField(read_only=False)
    tagname = serializers.SerializerMethodField('get_tagname')

    class Meta:
        model = posts
        fields = ['id', 'title', 'content', 'tags',
                  'timestamp', 'user', 'reply', 'postcount', 'picture', 'dtime', 'descrip', 'tagname']

    def get_timestamp(self, obj):
        mytimestamp = "Today"
        if datetime.date.today() == (obj.timestamp).date():
            mytimestamp = "Today"
        else:
            subtractime = (datetime.date.today()-(obj.timestamp).date()).days
            if subtractime == 1:
                mytimestamp = "Yesterday"
            else:
                mytimestamp = str(subtractime)+" days ago"
        return mytimestamp

    def get_reply(self, obj):
        reply = comments.objects.filter(post=obj.id)
        return reply.count()

    def get_postcount(self, obj):
        postcount = posts.objects.all().count()
        return postcount

    def get_picture(self, obj):
        try:
            picture = "http://localhost:8000"+obj.picture.url
        except:
            picture = None
        return picture

    def get_dtime(self, obj):
        dtime = (obj.timestamp).date()
        formatdate = dtime.strftime('%d %b %Y')
        return formatdate

    def get_tagname(self, obj):
        tagname = articletags.objects.filter(toarticletag=obj.id)
        serializers = PostTagSerializer(tagname, many=True)
        return serializers.data


class PostTagSerializer(serializers.ModelSerializer):
    # toarticletag = StringRelatedField(many=True)

    class Meta:
        model = articletags
        fields = ['id', 'name', 'tag', 'timestamp']


class BlogTagSerializer(serializers.ModelSerializer):
    toarticletag = serializers.StringRelatedField(many=True)

    class Meta:
        model = articletags
        fields = ['id', 'name', 'tag', 'timestamp', 'toarticletag']


class TagSerializer(serializers.ModelSerializer):
    mytags = PostTagSerializer(many=True, read_only=True)

    class Meta:
        model = tags
        fields = ['name', 'mytags']


class CommentActionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    fullname = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=200)
    message = serializers.CharField(max_length=500)


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = comments
        fields = ['message', 'status',
                  'post', 'user', 'timestamp', 'visitor']


class CommentDisplaySerializer(serializers.ModelSerializer):
    fullname = serializers.SerializerMethodField(read_only=True)
    visitortimestamp = serializers.SerializerMethodField()
    commenttimestamp = serializers.SerializerMethodField()
    nameInitial = serializers.SerializerMethodField()

    class Meta:
        model = comments
        fields = ['message', 'status', 'post', 'user',
                  'visitor', 'fullname', 'visitortimestamp', 'timestamp', 'commenttimestamp', 'nameInitial']

    def get_fullname(self, obj):
        name = obj.visitor != None
        fullname = ""
        if name == True:
            fullname = obj.visitor.fullname
        else:
            fullname = "Admin"
        return fullname

    def get_nameInitial(self, obj):
        name = obj.visitor != None
        fullname = ""
        if name == True:
            fullname = obj.visitor.fullname
        else:
            fullname = "Admin"
        return fullname[0].upper()

    def get_visitortimestamp(self, obj):
        mytimestamp = "Today"
        if datetime.date.today() == (obj.timestamp).date():
            mytimestamp = "Today"
        else:
            subtractime = (datetime.date.today()-(obj.timestamp).date()).days
            if subtractime == 1:
                mytimestamp = "Yesterday"
            else:
                mytimestamp = str(subtractime)+" days ago"
        return mytimestamp

    def get_commenttimestamp(self, obj):
        mytimestamp = "Today"
        mydtime = obj.timestamp.strftime('%r - %D')
        if datetime.date.today() == (obj.timestamp).date():
            mytimestamp = "Today "+mydtime
        else:
            subtractime = (datetime.date.today()-(obj.timestamp).date()).days
            if subtractime == 1:
                mytimestamp = "Yesterday "+mydtime
            else:
                mytimestamp = str(subtractime)+" days ago "+mydtime
        return mytimestamp


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = messages
        fields = ['content', 'user']


class GallerySerializer(serializers.ModelSerializer):
    # picture = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = gallery
        fields = ['id', 'title', 'picture', 'discrip']

    # def get_picture(self, obj):
    #     try:
    #         picture = "http://localhost:8000"+obj.picture.url
    #     except:
    #         picture = None
    #     return picture

class GalleryUploadSeralizer(serializers.HyperlinkedModelSerializer):
    class Meta:
        models=gallery
        fields=['title','picture','discrip']


class GalleryEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = gallery
        fields = ['id', 'title', 'picture', 'discrip']


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = profile
        fields = ['id', 'user', 'contact', 'location', 'picture']


class ProfileDisplaySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()

    class Meta:
        model = profile
        fields = ['id', 'user', 'contact', 'location', 'picture',
                  'username', 'first_name', 'last_name', 'email']

    def get_username(self, obj):
        myuser = obj.user.username
        return myuser

    def get_first_name(self, obj):
        first_name = obj.user.first_name
        return first_name

    def get_last_name(self, obj):
        last_name = obj.user.last_name
        return last_name

    def get_email(self, obj):
        email = obj.user.email
        return email
