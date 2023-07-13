import json

from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from jobProposal.models.User import User
from jobProposal.models.UserInfo import UserInfo


def get_all_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serialized_users = serializers.serialize('json', users)
        deserialized_users = json.loads(serialized_users)
        return HttpResponse(json.dumps(deserialized_users, ensure_ascii=False), content_type='application/json', status=200)

@csrf_exempt
def update_button_1(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

        username = data.get('username')

        if not username:
            return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
        try:
            entity = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)
        entity.button_1_counter += 1
        entity.save()
        return JsonResponse({'message': 'Button 1 updated successfully.'}, content_type='application/json', status=200)

@csrf_exempt
def update_button_2(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

        username = data.get('username')
        if not username:
            return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
        try:
            entity = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)
        entity.button_2_counter += 1
        entity.save()
        return JsonResponse({'message': 'Button 2 updated successfully.'}, content_type='application/json', status=200)

@csrf_exempt
def update_user_last_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

        username = data.get('username')
        if not username:
            return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
        try:
            entity = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)
        entity.last_login = timezone.now()
        entity.save()
        return JsonResponse({'message': 'Last login updated successfully.'}, content_type='application/json', status=200)

@csrf_exempt
def update_time_connected(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

        username = data.get('username')
        time = data.get('time')
        if not username:
            return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
        try:
            entity = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)

        if not time:
            return JsonResponse({'error': 'Missing \'time\' parameter.'}, content_type='application/json', status=400)

        entity.time_connected += time
        entity.save()
        return JsonResponse({'message': 'Time connected updated successfully.'}, content_type='application/json',
                            status=200)


def get_user_last_login(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        if not username:
            return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
        try:
            entity = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)

        return JsonResponse({'last_login': entity.last_login}, content_type='application/json', status=200)


def get_user_info(request):
    if request.method == 'GET':
        user_info = UserInfo.objects.all()
        serialized_user_info = serializers.serialize('json', user_info)
        deserialized_user_info = json.loads(serialized_user_info)
        return HttpResponse(json.dumps(deserialized_user_info, ensure_ascii=False), content_type='application/json',
                            status=200)