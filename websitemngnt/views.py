from django.shortcuts import render, redirect
from adminmanagement.forms import SomeForm
from adminmanagement.models import posts
from adminmanagement.serializers import PostRelationSerializer
# Create your views here.


def summernote_view(request):
    form = SomeForm()
    context = {"content": form}
    return render(request, 'pages/form.html', context)


def home_view(request):
    return render(request, 'website/home.html')


def about_view(request):
    return render(request, 'website/aboutus.html')


def services_view(request):
    return render(request, 'website/services.html')


def appointment_view(request):
    return render(request, 'website/appointment.html')


def gallery_view(request):
    return render(request, 'website/gallery.html')


def doctor_view(request):
    return render(request, 'website/doctor.html')


def blog_view(request):
    return render(request, 'website/blog.html')


def contact_view(request):
    return render(request, 'website/contact.html')
