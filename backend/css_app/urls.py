from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views



router = DefaultRouter()
router.register("users", views.AppUserViewSet, basename='user')
router.register("comments", views.CommentViewSet, basename='comment')
router.register("my-posts", views.UserPostsViewSet, basename="my-posts")
router.register("all-posts", views.AllPostsViewSet, basename="all-posts")
router.register("categories", views.AllCategoriesViewSet, basename="categories")



urlpatterns = [
    path('login/', views.handle_login),
    path('logout/', views.handle_logout),
    path('get-location/', views.get_user_location),
    path('verify-user/', views.verify_user),
    path('news/', views.news_view),
    path('', include(router.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)