import json
import os
import urllib.request
import urllib.error

script_url = os.getenv(
    'NEWSLETTER_SCRIPT_URL',
    'https://script.google.com/macros/s/AKfycbxz_EpY31kHGXAg8BsymBJyPjctdl5QfqYI14vZvhi-Rgna7h3cOJETWChHB_N4quivfw/exec',
)

test_payload = {'email': 'test@gmail.com'}

request = urllib.request.Request(
    script_url,
    data=json.dumps(test_payload).encode('utf-8'),
    method='POST',
    headers={
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
    }
)

print('Sending test payload to:', script_url)
print('Payload:', test_payload)

try:
    with urllib.request.urlopen(request, timeout=20) as response:
        body = response.read().decode('utf-8')
        print('Status:', response.status)
        print('Response headers:', response.headers)
        print('Response body:', body)
        try:
            parsed = json.loads(body)
            print('Parsed JSON:', parsed)
        except json.JSONDecodeError as decode_error:
            print('JSON decode error:', decode_error)
except urllib.error.HTTPError as http_error:
    print('HTTPError:', http_error.code)
    print('Body:', http_error.read().decode('utf-8'))
except Exception as exc:
    print('Error:', exc)

# Also test GET request to check spreadsheet info
print('\n--- Testing GET request ---')
try:
    get_request = urllib.request.Request(script_url, method='GET')
    with urllib.request.urlopen(get_request, timeout=20) as response:
        body = response.read().decode('utf-8')
        print('GET Status:', response.status)
        print('GET Body:', body)
        parsed = json.loads(body)
        print('GET Parsed:', parsed)
except Exception as e:
    print('GET Error:', type(e).__name__, e)
