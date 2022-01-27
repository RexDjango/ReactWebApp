from django.db import models
from django.conf import settings
from django.db.models.expressions import OrderBy
from websitemngnt.models import commenter
from django.db.models.signals import post_save

User = settings.AUTH_USER_MODEL


class posts(models.Model):
    title = models.CharField(max_length=100)
    picture = models.ImageField(null=True, blank=True)
    descrip = models.CharField(max_length=300)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    tags = models.ManyToManyField("articletags", null=True,
                                  blank=True, related_name='toarticletag')
    encode = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title


class comments(models.Model):
    message = models.TextField()
    status = models.CharField(max_length=45)
    post = models.ForeignKey(
        posts, null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)
    visitor = models.ForeignKey(
        commenter, null=True, blank=True, on_delete=models.SET_NULL)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.message


class tags(models.Model):
    name = models.CharField(max_length=45)

    def __str__(self):
        return self.name


class articletags(models.Model):
    name = models.CharField(max_length=40)
    publish = models.BooleanField(default=False)
    tag = models.ForeignKey(
        tags, null=True, blank=True, related_name='mytags', on_delete=models.SET_NULL)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class messages(models.Model):
    content = models.TextField()
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.content


class notifications(models.Model):
    notifiable_id = models.CharField(max_length=45)
    notifiable_type = models.CharField(max_length=45)
    comments = models.ForeignKey(
        comments, null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.notifiable_id


class settings(models.Model):
    site_name = models.CharField(max_length=100)
    post_per_page = models.IntegerField(default=False)
    under_maintenance = models.BooleanField(default=False)
    prevent_comment = models.BooleanField(default=False)
    tag_visibility = models.BooleanField(default=False)

    def __str__(self):
        return self.site_name

class Employee(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    designation=models.CharField(max_length=20,null=False,blank=False)
    salary=models.IntegerField(null=True,blank=True)
    picture=models.ImageField(upload_to='picture/%Y/%m/%d',max_length=255,null=True,blank=True)
    
    class Meta:
        ordering=('-salary',)
    
    def __str__(self):
        return "{0} - {1}".format(self.user.username,self.designation)
        

class profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    contact = models.CharField(max_length=45)
    location = models.CharField(max_length=200)
    picture = models.ImageField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __int__(self):
        return self.id


def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        profile.objects.get_or_create(user=instance)


post_save.connect(user_did_save, sender=User)
