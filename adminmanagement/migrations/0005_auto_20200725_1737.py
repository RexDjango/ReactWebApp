# Generated by Django 3.0 on 2020-07-25 09:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adminmanagement', '0004_post_tags_name'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='post_tags',
            unique_together=set(),
        ),
    ]