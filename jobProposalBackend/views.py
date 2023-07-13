import json

from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.utils import timezone

from jobProposalBackend.models.User import User


def get_all_users(request):
    users = User.objects.all()
    serialized_users = serializers.serialize('json', users, fields=('username', 'password'))
    deserialized_users = json.loads(serialized_users)
    return HttpResponse(json.dumps(deserialized_users, ensure_ascii=False), content_type='application/json', status=200)


def update_button_1(request):
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


def update_button_2(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

    username = data.get('username')
    if not username:
        return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
    try:
        entity = User.objects.get(id=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)
    entity.button_2_counter += 1
    entity.save()
    return JsonResponse({'message': 'Button 2 updated successfully.'}, content_type='application/json', status=200)


def update_user_last_login(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

    username = data.get('username')
    if not username:
        return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
    try:
        entity = User.objects.get(id=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found.'}, status=404)
    entity.last_login = timezone.now()
    entity.save()
    return JsonResponse({'message': 'Last login updated successfully.'}, content_type='application/json', status=200)


def update_time_connected(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

    username = data.get('username')
    time = data.get('time')
    if not username:
        return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
    try:
        entity = User.objects.get(id=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)

    if not time:
        return JsonResponse({'error': 'Missing \'time\' parameter.'}, content_type='application/json', status=400)

    entity.time_connected += time
    entity.save()
    return JsonResponse({'message': 'Time connected updated successfully.'}, content_type='application/json',
                        status=200)


def get_user_last_login(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'No body sent'}, content_type='application/json', status=400)

    username = data.get('username')
    if not username:
        return JsonResponse({'error': 'Missing \'username\' parameter.'}, content_type='application/json', status=400)
    try:
        entity = User.objects.get(id=username)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found.'}, content_type='application/json', status=404)

    return JsonResponse({'last_login': entity.last_login}, content_type='application/json', status=200)
