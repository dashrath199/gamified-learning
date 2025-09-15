from django.urls import path
from . import views

# This line is important so you can use {% url 'homepage' %} in templates
app_name = 'core'

urlpatterns = [
    # When the user visits the root URL (''), show the index view.
    path('', views.index, name='homepage'),
]