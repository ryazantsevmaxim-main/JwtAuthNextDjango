from django.urls import path
from .views import Register, VerifyUser, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('signup', Register.as_view()),
    path('login', MyTokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('token/verify', VerifyUser.as_view()),
]

