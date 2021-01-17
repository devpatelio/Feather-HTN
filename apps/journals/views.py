from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from .serializers import JournalSerializer


class JournalListView(APIView):
    def post(self, request):
        serializer = JournalSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_entry_prediction(request):
    if request.method == 'GET':
        return render(request, 'templates/entry.html')
    elif request.method == 'POST':
        entry = request.form['text']
        return render(request, 'templates/prediction.html', {'entry': entry})
