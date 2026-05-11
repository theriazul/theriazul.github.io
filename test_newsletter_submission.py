import json
import urllib.request
import urllib.error

script_url = 'https://script.google.com/macros/s/AKfycby05HCXWtZxaVsJFlm023p9ZfBAx0Ugq9M7Fa8xick_kih1tY8BD2hd5272ujxH-g1Q/exec'

test_payload = {'email': 'test@gmail.com'}

request = urllib.request.Request(
    script_url,
    data=json.dumps(test_payload).encode('utf-8'),
    method='POST',
    headers={
        'Content-Type': 'text/plain;charset=utf-8',
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
