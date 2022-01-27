from django.db import models

# Create your models here.


class services(models.Model):
    shortdescrip = models.CharField(max_length=200, blank=True, null=True)
    longdescrip = models.CharField(max_length=300)
    tags = models.CharField(max_length=100)
    price = models.FloatField()
    edate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.longdescrip
