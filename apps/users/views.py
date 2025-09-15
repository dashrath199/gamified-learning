from django.views.generic import TemplateView

# These views just render the templates.
# The actual data is fetched by JavaScript via the API.

class LoginView(TemplateView):
    template_name = 'users/login.html'

class RegisterView(TemplateView):
    template_name = 'users/register.html'

class DashboardView(TemplateView):
    template_name = 'users/dashboard.html'

class ProfileView(TemplateView):
    template_name = 'users/profile.html'

class LeaderboardView(TemplateView):
    template_name = 'users/leaderboard.html'