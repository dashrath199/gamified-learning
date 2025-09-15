from django.shortcuts import render

def index(request):
    """
    Renders the main landing page.
    """
    return render(request, 'core/index.html')