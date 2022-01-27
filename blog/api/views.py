from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from adminmanagement.models import comments
from websitemngnt.models import commenter
from adminmanagement.serializers import ActionSerializer, CommentsSerializer, CommentActionSerializer, CommentDisplaySerializer
from websitemngnt.serializers import CommenterSerializer


def get_paginated_query_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = CommentDisplaySerializer(
        paginated_qs, many=True, context={"request", request})
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST', 'GET'])
def savecomment_view(request):
    serializer = CommentsSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        obj = commenter.objects.filter(email=request.data.get('email'))
        if obj.exists():
            obj.first()
            serializer.save(visitor=commenter.objects.get(id=obj[0].id))
        else:
            serializersavevisitor = CommenterSerializer(data=request.data)
            if serializersavevisitor.is_valid(raise_exception=True):
                serializersavevisitor.save()
                findnewsavevisitor = commenter.objects.filter(
                    email=request.data.get('email'))
                if findnewsavevisitor.exists():
                    findnewsavevisitor.first()
                    serializer.save(visitor=commenter.objects.get(
                        id=findnewsavevisitor[0].id))
        return Response({}, status=201)
    return Response({}, status=400)


@api_view(['GET'])
def commentlist_view(request):
    qs = comments.objects.all()

    # serializer = CommentDisplaySerializer(commentview, many=True)
    # context = {"commentlist": serializer.data}
    return get_paginated_query_response(qs, request)
