from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

from feather.token_auth import TokenAuthMiddlewareStack
from apps.signaling import consumers


application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([
            re_path(r'room/(?P<room_id>\w+)/$', consumers.SignalingConsumer.as_asgi()),
})
