from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserCreateSerializer, UserSerializer, CustomTokenObtainPairSerializer


class Register(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)

        refresh = RefreshToken.for_user(user)

        user = UserSerializer(user)

        data = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": user.data
        }

        return Response(data, status=status.HTTP_201_CREATED)


class VerifyUser(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        data = {"user": user.data}
        return Response(data, status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
