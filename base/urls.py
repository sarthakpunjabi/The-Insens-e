from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path('users/profile/',views.getUserProfile,name="users-profile"),
    path('users/profile/update/',views.updateUserProfile,name="user-profile-update"),
    path('users/',views.getUsers,name="users"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('products/',views.getProducts,name="products"),
    path('products/top/',views.getTopProducts,name='Top-products'),

    path('products/<str:pk>/reviews/',views.createProductReview,name="create-review"),
    path('products/<str:pk>',views.getProduct,name="product"),
    path('users/register/',views.registerUser,name="register"),
    path('orders/add/',views.addOrderItems,name='orders-add'),
    path('orders/myorders/',views.getMyOrders,name='myorders'),
    path('orders/payment/' ,views.payment,name="payment razorpay"),
    path('orders/payment/success/', views.handle_payment_success, name="payment_success"),

    path('orders/<str:pk>/',views.getOrderById,name='user-order'),
    path('orders/<str:pk>/pay/',views.updateOrderToPaid,name='pay'),

    
]
