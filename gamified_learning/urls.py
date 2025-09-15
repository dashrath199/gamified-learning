from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/v1/', include('api.urls')),

    # Frontend pages
    path('', include('apps.core.urls')),
    path('users/', include('apps.users.urls')),
    path('games/', include('apps.games.urls')),
    
    # This allows Django to serve the index.html for any other path not matched above.
    # Useful for client-side routing in a full SPA, but here we use it as a catch-all.
    # path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]