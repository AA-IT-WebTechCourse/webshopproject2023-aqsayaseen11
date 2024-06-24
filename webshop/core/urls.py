from django.urls import path

from core.views import (
    ProductListView,
    ProductDetailView,
    PopulateDatabaseView,
    CartAddView,
    CartRemoveView,
    CartListView,
    MyTokenObtainPairView,
    CreateUserView,
    ChangePasswordView,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = "core"


urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register", CreateUserView.as_view()),
    path("change-password", ChangePasswordView.as_view(), name="change_password"),
    path("products", ProductListView.as_view()),
    path("populate-database", PopulateDatabaseView.as_view(), name="populate_database"),
    path("cart", CartListView.as_view(), name="cart_list"),
    path("cart/add", CartAddView.as_view(), name="cart_add"),
    path("cart/remove", CartRemoveView.as_view(), name="cart_remove"),
    path("products/<int:pk>", ProductDetailView.as_view(), name="product_detail"),
]
