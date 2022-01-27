from django.contrib import admin
from django.urls import path, include, re_path


from django.conf import settings
from django.conf.urls.static import static
from rest_framework import views
from accounts.views import (
    login_view, register_view, logout_view,
)
from websitemngnt.views import (
    home_view, about_view, services_view,
    appointment_view, gallery_view, doctor_view,
    blog_view, contact_view, summernote_view
)
urlpatterns = [
    path('summernote/', include('django_summernote.urls')),
    path('mysummernote/', summernote_view, name="mysummernote"),
    path('', home_view, name='website-home'),
    path('about/', about_view, name="website-about"),
    path('services/', services_view, name="website-services"),
    path('appointment/', appointment_view, name="website-appointment"),
    path('gallery/', gallery_view, name="website-gallery"),
    path('doctor/', doctor_view, name="website-doctor"),
    path('websiteblog/', blog_view, name="website-blog"),
    path('contact/', contact_view, name="website-contact"),

    path('admin/', admin.site.urls),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name="logout"),
    path('register/', register_view, name="register"),
    path('myadmin/', include('adminmanagement.urls')),
    path('api/', include('adminmanagement.api.urls')),
    path('api/', include('blog.api.urls')),
    path('apiservices/', include('services.api.urls')),
    path('blog/', include('blog.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
