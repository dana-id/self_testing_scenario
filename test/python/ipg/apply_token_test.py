import os
import pytest
import asyncio
from dana.utils.snap_configuration import SnapConfiguration, AuthSettings, Env
from dana.ipg.v1.enum import *
from dana.ipg.v1.models import *
from dana.ipg.v1 import *
from dana.ipg.v1.api import *
from dana.api_client import ApiClient
from dana.exceptions import *
from uuid import uuid4
from helper.util import get_request, with_delay
from helper.api_helpers import get_headers_with_signature, execute_and_assert_api_error
from helper.assertion import assert_response, assert_fail_response
from automate_oauth import automate_oauth

title_case = "ApplyToken"
json_path_file = "resource/request/components/IPG.json"

configuration = SnapConfiguration(
    api_key=AuthSettings(
        PRIVATE_KEY=os.environ.get("PRIVATE_KEY"),
        ORIGIN=os.environ.get("ORIGIN"),
        X_PARTNER_ID=os.environ.get("X_PARTNER_ID"),
        ENV=Env.SANDBOX
    )
)

with ApiClient(configuration) as api_client:
    api_instance = IPGApi(api_client)

def get_auth_code():
    return asyncio.run(automate_oauth())

@pytest.fixture(scope="module")
def test_apply_token_auth_code():
    return get_auth_code()

@with_delay()
def test_apply_token_success(test_apply_token_auth_code):
    case_name = "ApplyTokenSuccess"
    json_dict = get_request(json_path_file, title_case, case_name)
    json_dict["authCode"] = test_apply_token_auth_code
    request_obj = ApplyTokenAuthorizationCodeRequest.from_dict(json_dict)
    try:
        response = api_instance.apply_token(request_obj)
        assert_response(json_path_file, title_case, case_name, ApplyTokenResponse.to_json(response))
    except ApiException as e:
        pytest.fail(f"API call failed: {e}")

@with_delay()
def test_apply_token_fail_expired_authcode(test_apply_token_auth_code):
    # case_name = "ApplyTokenFailExpiredAuthcode"
    # json_dict = get_request(json_path_file, title_case, case_name)
    # # Generate two auth codes
    # first_auth_code = test_apply_token_auth_code
    # second_auth_code = test_apply_token_auth_code
    # json_dict["authCode"] = first_auth_code
    # request_obj = ApplyTokenAuthorizationCodeRequest.from_dict(json_dict)
    # try:
    #     response = api_instance.apply_token(request_obj)
    #     # Expecting failure, so assert_fail_response
    #     assert_fail_response(json_path_file, title_case, case_name, ApplyTokenResponse.to_json(response))
    # except ApiException as e:
    #     # Optionally, check for specific error code/message for expired auth code
    #     assert "Unauthorized" in str(e).lower()
    pytest.skip("SKIP: Waiting for auth code expiration handling")

@with_delay()
def test_apply_token_fail_authcode_used():
    # case_name = "ApplyTokenFailAuthcodeUsed"
    # json_dict = get_request(json_path_file, title_case, case_name)
    # json_dict["authCode"] = "Used Auth Code here"  # Example used auth code
    # request_obj = ApplyTokenAuthorizationCodeRequest.from_dict(json_dict)
    # try:
    #     response = api_instance.apply_token(request_obj)
    #     # Expecting failure, so assert_fail_response
    #     assert_fail_response(json_path_file, title_case, case_name, ApplyTokenResponse.to_json(response))
    # except UnauthorizedException as e:
    #     # Optionally, check for specific error code/message for used auth code
    #     assert "unauthorized" in str(e).lower()
    pytest.skip("SKIP: Waiting for auth code used handling")

@with_delay()
def test_apply_token_fail_authcode_invalid(test_apply_token_auth_code):
    case_name = "ApplyTokenFailAuthcodeInvalid"
    json_dict = get_request(json_path_file, title_case, case_name)
    json_dict["authCode"] = "1kjlhldh1oiijhklj1FOELKHJQWQ1"  # Example invalid auth code
    request_obj = ApplyTokenAuthorizationCodeRequest.from_dict(json_dict)
    try:
        response = api_instance.apply_token(request_obj)
        # Expecting failure, so assert_fail_response
        assert_fail_response(json_path_file, title_case, case_name, ApplyTokenResponse.to_json(response))
    except UnauthorizedException as e:
        # Optionally, check for specific error code/message for used auth code
        assert "unauthorized" in str(e).lower()

@with_delay()
def test_apply_token_fail_invalid_params():
    case_name = "ApplyTokenFailInvalidParams"
    json_dict = get_request(json_path_file, title_case, case_name)
    pytest.skip("SKIP: Placeholder test")

@with_delay()
def test_apply_token_fail_invalid_mandatory_fields(test_apply_token_auth_code):
    case_name = "ApplyTokenFailInvalidMandatoryFields"
    json_dict = get_request(json_path_file, title_case, case_name)
    json_dict["authCode"] = test_apply_token_auth_code  # Example invalid auth code
    request_obj = ApplyTokenAuthorizationCodeRequest.from_dict(json_dict)
    
    headers = get_headers_with_signature(
        method="POST",
        resource_path="/v1.0/access-token/b2b2c.htm",
        request_obj= json_dict,
        with_timestamp=False
    )

    execute_and_assert_api_error(
        api_client,
        "POST",
        "http://api.sandbox.dana.id/v1.0/access-token/b2b2c.htm",
        request_obj,
        headers,
        400,
        json_path_file,
        title_case,
        case_name
    )

@with_delay()
def test_apply_token_fail_invalid_signature(test_apply_token_auth_code):
    # case_name = "ApplyTokenFailInvalidSignature"
    # json_dict = get_request(json_path_file, title_case, case_name)
    # json_dict["authCode"] = test_apply_token_auth_code  # Example invalid auth code
    # request_obj = ApplyTokenAuthorizationCodeRequest.from_dict(json_dict)
    
    # headers = get_headers_with_signature(invalid_signature=True)

    # execute_and_assert_api_error(
    #     api_client,
    #     "POST",
    #     "http://api.sandbox.dana.id/v1.0/access-token/b2b2c.htm",
    #     request_obj,
    #     headers,
    #     400,
    #     json_path_file,
    #     title_case,
    #     case_name
    # )    
    pytest.skip("SKIP: Need confirmation on invalid signature handling. Expected to return 401 Unauthorized, but currently returns 400 Bad Request.")
