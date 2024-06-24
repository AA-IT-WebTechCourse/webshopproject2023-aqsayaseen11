from .constants import DUMMY_PRODUCTS
from django.db import transaction
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Product, Cart
from .serializers import ProductSerializer, CartSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product
from .serializers import ProductSerializer, UserSerializer, ChangePasswordSerializer


def frontend_homepage(request, **kwargs):
    context = {}
    return render(request, "index.html", context)


class ProductListView(generics.ListCreateAPIView, generics.UpdateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        title = (self.request.query_params.get("title") or "").strip()
        created_by = (self.request.query_params.get("created_by") or "").strip()
        purchased_by = (self.request.query_params.get("purchased_by") or "").strip()

        query_filter = Q()
        if created_by == "me":
            query_filter |= Q(created_by=self.request.user)

        if purchased_by == "me":
            query_filter |= Q(purchased_by=self.request.user)

        if title:
            query_filter &= Q(title__icontains=title)

        return Product.objects.filter(query_filter)

    def get_serializer_context(self):
        context = super(ProductListView, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        return super().post(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        product_id = request.data.get("id")
        product = Product.objects.get(id=product_id)
        if product.created_by != request.user:
            return Response(
                {"detail": "You can only update products that you created."},
                status=status.HTTP_403_FORBIDDEN,
            )

        title = request.data.get("title")
        description = request.data.get("description")
        price = request.data.get("price")

        if title is not None:
            product.title = title

        if description is not None:
            product.description = description

        if price is not None:
            product.price = price

        product.save()
        return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class PopulateDatabaseView(APIView):
    def get(self, request, format=None):
        with transaction.atomic():
            # Clear the database
            User.objects.all().delete()
            Product.objects.all().delete()

            # Create 6 users
            for i in range(0, 6):
                user = User.objects.create_user(
                    username=f"testuser{i}",
                    password=f"pass{i}",
                    email=f"testuser{i}@shop.aa",
                )

                if i < 3:
                    for j in range(10):
                        Product.objects.create(
                            title=DUMMY_PRODUCTS[i][j]["title"],
                            description=DUMMY_PRODUCTS[i][j]["description"],
                            price=DUMMY_PRODUCTS[i][j]["price"],
                            created_by=user,
                        )

        return Response(
            {"success": True},
            status=status.HTTP_200_OK,
        )


class CartAddView(APIView):
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        product_id = request.data.get("product_id")
        product = Product.objects.get(id=product_id)
        if product.created_by == request.user:
            return Response(
                {"detail": "You cannot add your own product to the cart."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        Cart.objects.create(
            user=request.user, product=product, product_price=product.price
        )
        return Response(status=status.HTTP_201_CREATED)


class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Cart.objects.none()

        return Cart.objects.filter(user=self.request.user)


class CartRemoveView(APIView):
    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication credentials were not provided."},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        product_id = request.data.get("product_id")
        product = Product.objects.get(id=product_id)
        cart = Cart.objects.filter(user=request.user, product=product)
        if not cart.exists():
            return Response(
                {"detail": "Product not found in cart."},
                status=status.HTTP_404_NOT_FOUND,
            )
        cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        self.object = self.request.user
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            update_session_auth_hash(
                request, self.object
            )  # Update the session hash to keep the user logged in after password change
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
