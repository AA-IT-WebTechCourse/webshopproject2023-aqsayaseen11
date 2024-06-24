from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Product(models.Model):
    PRODUCT_STATUSES = [
        ("SALE", "On Sale"),
        ("SOLD", "Sold"),
    ]

    title = models.CharField(max_length=60)
    description = models.TextField(max_length=120)
    price = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=4, choices=PRODUCT_STATUSES, default="SALE")
    created_by = models.ForeignKey(
        User, related_name="products", on_delete=models.CASCADE
    )
    purchased_by = models.ForeignKey(
        User,
        related_name="purchased_products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    class Meta:
        db_table = "products"

    def __str__(self):
        return f"{self.title} | {self.status} | {self.created_at.date()} | {self.created_by.id}"


class Cart(models.Model):
    user = models.ForeignKey(User, related_name="cart", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="cart", on_delete=models.CASCADE)
    product_price = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "cart"

    def __str__(self) -> str:
        return f"{self.user.username} | {self.product.title}"
