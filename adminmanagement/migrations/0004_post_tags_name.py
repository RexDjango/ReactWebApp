# Generated by Django 3.0 on 2020-07-24 13:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('adminmanagement', '0003_auto_20200724_1000'),
    ]

    operations = [
        migrations.AddField(
            model_name='post_tags',
            name='name',
            field=models.CharField(default=django.utils.timezone.now, max_length=40),
            preserve_default=False,
        ),
    ]
