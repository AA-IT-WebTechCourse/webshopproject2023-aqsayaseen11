from django.contrib import admin
from core.models import Product, Cart


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(Cart)
class Cartdmin(admin.ModelAdmin):
    pass
