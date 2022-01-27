from django import forms
from .models import posts, profile
from django_summernote.widgets import SummernoteWidget, SummernoteInplaceWidget

# Apply summernote to specific fields.


class SomeForm(forms.Form):
    # instead of forms.Textarea
    foo = forms.CharField(widget=SummernoteWidget())


class PostForm(forms.ModelForm):
    class Meta:
        model = posts
        fields = ['title', 'content', 'user', 'tags']

    def clean_title(self):
        title = self.cleaned_data.get('title')

    def clean_content(self):
        content = self.cleaned_data.get('content')


class ProfileForm(forms.ModelForm):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email = forms.CharField(required=False)
    contact = forms.CharField(required=False)
    picture = forms.ImageField(required=False)

    class Meta:
        model = profile
        fields = ["location"]
