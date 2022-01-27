from django.db import models
from django.conf import settings

# Create your models here.
def upload_path(instance,filename):
    return '/'.join(['covers',filename])

class gallery(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    discrip = models.CharField(max_length=200, null=True, blank=True)
    picture = models.ImageField(null=True, blank=True,upload_to=upload_path)
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.title


class commenter(models.Model):
    fullname = models.CharField(max_length=300, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now=True)
    contact = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.fullname
