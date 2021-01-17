from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json


class SignalingConsumer(WebsocketConsumer):
    def connect(self):
        user = self.scope.get('user')
        async_to_sync(self.channel_layer.group_add)('socket', self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)('socket', self.channel_name)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)

        async_to_sync(self.channel_layer.group_send)(
            'socket',
            {
                'type': 'send_message',
                'data': text_data_json,
            }
        )


    def send_message(self, event):
        self.send(text_data=json.dumps(event['data']))


class QueueConsumer(WebsocketConsumer):
    def connect(self):
        user = self.scope.get('user')
        async_to_sync(self.channel_layer.group_add)('queue', self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)('queue', self.channel_name)
