import requests

# Making a GET request
create_row_data = {'location' : '11 KV substation', 'work_permit':'Height/Civil', 'activities':'Paint work', 'chemicals':''}
r = requests.post('http://127.0.0.1:5173/recommendation', json=create_row_data, timeout=60000)
# check status code for response received
# success code - 200
print(r)

# print content of request
print(r.content)
