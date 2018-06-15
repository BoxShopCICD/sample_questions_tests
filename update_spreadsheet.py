# had to create a service account
# had to add that service account email as an editor of the sheet
# had to grant g suite domain rights

"""
BEFORE RUNNING:
---------------
1. If not already done, enable the Google Sheets API
   and check the quota for your project at
   https://console.developers.google.com/apis/api/sheets
2. Install the Python client library for Google APIs by running
   `pip install --upgrade google-api-python-client`
"""
from pprint import pprint
import os
import sys
from googleapiclient import discovery
from google.oauth2 import service_account
import datetime
import argparse

parser = argparse.ArgumentParser(description='Updates a google spreadsheet')
parser.add_argument('--sheet-id', help='ID of google sheet', required=True)
parser.add_argument('--service-key', help='Path to service key', required=True)
parser.add_argument('--fullname', help='Full name of GitHub user', required=True)
parser.add_argument('--email', help='Email of GitHub user', required=True)
parser.add_argument('--username', help='Username of GitHub user', required=True)
parser.add_argument('--range', help="A1 range notation of sheet", required=True)
args = vars(parser.parse_args())

email = args['email']
if not email:
    print "User email not available. Skipping spreadsheet update"
    sys.exit(0)
first = args['fullname'].split()[0]
last = args['fullname'].split()[1] if len(args['fullname'].split()) > 1 else 'null'
user = args['username']
today = str(datetime.date.today())

value_range_body = {
    "values": [
        [first, last, email, today, user]
    ]
}

# https://developers.google.com/sheets/quickstart/python#step_3_set_up_the_sample
for k, v in args.items():
	print {k:v}

SERVICE_ACCOUNT_FILE = args['service_key']
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

service = discovery.build('sheets', 'v4', credentials=credentials)
#spreadsheet_id = '1EbEZ3qpJ6jNy3SoKuL_Hyvv1aYwmmW3QPFMNSsIxh8k'
spreadsheet_id = args['sheet_id']
#range_ = 'A1:E1'
range_ = args['range']
value_input_option = 'USER_ENTERED'

request = service.spreadsheets().values().append(spreadsheetId=spreadsheet_id, range=range_, body=value_range_body, valueInputOption=value_input_option)
response = request.execute()

# TODO: Change code below to process the `response` dict:
pprint(response)
