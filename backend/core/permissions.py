from rest_framework.permissions import BasePermission

class IsAdminOrReadyOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        if request.method in ('GET', 'HEAD', 'OPTIONS'):
            return True
        return hasattr(request.user, 'profile') and request.user.profile.role == 'admin'

class IsOwnerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        if hasattr(request.user, 'profile') and request.user.profile.role == 'admin':
            return True
        
        if request.method in ('GET', 'POST'):
            return True
        
        return False
    
    def has_object_permission(self, request, view, obj):
        if hasattr(request.user, 'profile') and request.user.profile.role == 'admin':
            return True
        return obj.user == request.user