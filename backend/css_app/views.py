from rest_framework import viewsets
from .models import AppUser, Post, Comment
from .serializers import *
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
import json
from django.contrib.gis.geos import Point
from rest_framework.decorators import api_view
import requests
from django.conf import settings
# from .utils import get_meta_from_jpeg


class AppUserViewSet(viewsets.ModelViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return (permissions.AllowAny(),) 
        return (permissions.IsAdminUser(),) 



class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 
        return super().perform_create(serializer)

    def get_queryset(self):
        return Comment.objects.all().order_by('id')


class UserPostsViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        # Might need something similar for HIEF images
        # image = self.request.FILES['image']
        # meta = get_meta_from_jpeg(image.temporary_file_path())
        # serializer.save(location=Point(meta['longitude'], meta['latitude'], srid=4326))
        serializer.save(user=self.request.user) 
        return super().perform_create(serializer)

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user.id).order_by('-id')




class AllPostsViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    http_method_names = ['get']

    def get_queryset(self):
        return Post.objects.all()

class AllCategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    http_method_names = ['get', 'post']

    def get_queryset(self):
        return Category.objects.all()




def error_on_request(error_msg):
    return JsonResponse({ "error": error_msg }, status=400)


def bad_request():
    return error_on_request("bad request")


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@csrf_exempt
def handle_login(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            user = authenticate(email=email, password=password)
            if user and user.is_active:
                login(request, user)
                return JsonResponse({ "email": user.email, "id": user.id }, status=200)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()
    

@csrf_exempt
def handle_logout(request):
    try:
        if request.method == "POST":
            logout(request)
            return JsonResponse({ "status": "logged out successfully" }, status=200)
    
    except Exception as e:
        return error_on_request(str(e))
    
    return bad_request()



@api_view(['GET'])
def news_view(request): 
    try:
        KEY = settings.CURRENTS_API_KEY
        requestUrl = f'https://api.currentsapi.services/v1/search?language=en&category=technology&apiKey={KEY}'

        requestHeaders = {
            "Accept": "application/json"
        }
        response = requests.get(requestUrl, headers=requestHeaders)
        response_JSON = response.json()
        return JsonResponse(response_JSON, status=200)
        
    except Exception as e:
        return error_on_request(str(e))



@api_view(['GET'])
def get_user_location(request):
    try:
        # request_IP = get_client_ip(request)
        API_KEY = settings.GEOLOCATION_API_KEY
        # Can't use this in dev with local IP - but use this in production
        # location_response = requests.get(f"https://geolocation-db.com/json/{API_KEY}/{request_IP}")
        location_response = requests.get(f"https://geolocation-db.com/json/{API_KEY}")
        location_JSON = location_response.json()
        return JsonResponse(location_JSON, status=200)

    except Exception as e:
        return error_on_request(str(e))
    

@api_view(['GET'])
def verify_user(request):
    if request.user.is_authenticated:
        return JsonResponse({ "email": request.user.email, "id": request.user.id }, status=200)
    return JsonResponse({"status": "not logged in"})




 




