from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import posts, comments, messages, articletags, tags, profile


class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)


admin.site.register(posts, PostAdmin)
admin.site.register(comments)
admin.site.register(messages)
admin.site.register(articletags)
admin.site.register(tags)
admin.site.register(profile)
