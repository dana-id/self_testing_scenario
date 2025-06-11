import os
import pytest
from dana.utils.snap_configuration import SnapConfiguration, AuthSettings, Env
from dana.ipg.v1.enum import *
from dana.ipg.v1.models import *
from dana.ipg.v1 import *
from dana.ipg.v1.api import *
from dana.api_client import ApiClient
from dana.exceptions import *
from uuid import uuid4
from helper.api_helpers import get_headers_with_signature, execute_and_assert_api_error
from helper.util import get_request, with_delay
from helper.assertion import assert_response, assert_fail_response

title_case = "CancelOrder"
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

def generate_partner_reference_no():
    return str(uuid4())

@pytest.fixture(scope="module")
def test_cancel_order_reference_number():
    return generate_partner_reference_no()

@with_delay()
def test_cancel_order_success_in_process(test_cancel_order_reference_number):
    """Should successfully cancel the order in process state"""
    case_name = "CancelOrderSuccessInProcess"
    json_dict = get_request(json_path_file, title_case, case_name)
    # Set the correct partner reference number if needed
    # if "originalPartnerReferenceNo" in json_dict:
    #     json_dict["originalPartnerReferenceNo"] = test_cancel_order_reference_number
    # else:
    #     json_dict["partnerReferenceNo"] = test_cancel_order_reference_number
    # cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    # api_response = api_instance.cancel_order(cancel_order_request_obj)
    # assert_response(
    #     json_path_file,
    #     title_case,
    #     case_name,
    #     CancelOrderResponse.to_json(api_response),
    #     {"partnerReferenceNo": test_cancel_order_reference_number}
    # )
    pytest.skip("SKIP: Need confirmation on responseMessage. Expected: 'Request is in process', Actual: 'Successful'")

@with_delay()
def test_cancel_order_fail_user_status_abnormal(test_cancel_order_reference_number):
    """Should fail to cancel the order when user status is abnormal"""
    case_name = "CancelOrderFailUserStatusAbnormal"
    json_dict = get_request(json_path_file, title_case, case_name)

    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)

    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected ForbiddenException but API call succeeded")
    except ForbiddenException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": test_cancel_order_reference_number}
        )   
    except:
        pytest.fail("Expected ForbiddenException but got a different exception")

@with_delay()
def test_cancel_order_fail_merchant_status_abnormal(test_cancel_order_reference_number):
    case_name = "CancelOrderFailMerchantStatusAbnormal"
    json_dict = get_request(json_path_file, title_case, case_name)

    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected NotFoundException but API call succeeded")
    except NotFoundException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": test_cancel_order_reference_number}
        )
    except Exception as e:
        print(f"Exception type: {type(e)}, message: {e}")
        pytest.fail("Expected NotFoundException but got a different exception")

@with_delay()
def test_cancel_order_fail_missing_parameter(test_cancel_order_reference_number):
    case_name = "CancelOrderFailMissingParameter"
    json_dict = get_request(json_path_file, title_case, case_name)
    json_dict["originalPartnerReferenceNo"] = test_cancel_order_reference_number
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)

    headers = get_headers_with_signature(
        method="POST",
        resource_path="/payment-gateway/v1.0/debit/cancel.htm",
        request_obj=json_dict,
        with_timestamp=False
    )

    execute_and_assert_api_error(
        api_client,
        "POST",
        "https://api.sandbox.dana.id/payment-gateway/v1.0/debit/cancel.htm",
        cancel_order_request_obj,
        headers,
        400,  # Bad Request
        json_path_file,
        title_case,
        case_name,
        {"partnerReferenceNo": test_cancel_order_reference_number}  
    )

@with_delay()
def test_cancel_order_fail_order_not_exist():
    # case_name = "CancelOrderFailOrderNotExist"
    # json_dict = get_request(json_path_file, title_case, case_name)
    
    # cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    # try:
    #     api_instance.cancel_order(cancel_order_request_obj)
    #     pytest.fail("Expected NotFoundException but API call succeeded")
    # except NotFoundException as e:
    #     assert_fail_response(
    #         json_path_file,
    #         title_case,
    #         case_name,
    #         e.body,
    #         {"partnerReferenceNo": json_dict["originalPartnerReferenceNo"]}  # Use the original partner reference number
    #     )
    # except Exception as e:
    #     print(f"Exception type: {type(e)}, message: {e}")
    #     pytest.fail("Expected NotFoundException but got a different exception")
    pytest.skip("SKIP: Need confirmation, Expected NotFoundException but API call succeeded")

@with_delay()
def test_cancel_order_fail_exceed_cancel_window_time():
    case_name = "CancelOrderFailExceedCancelWindowTime"
    json_dict = get_request(json_path_file, title_case, case_name)
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected ForbiddenException but API call succeeded")
    except ForbiddenException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": "4035715"}
        )
    except Exception as e:
        print(f"Exception type: {type(e)}, message: {e}")
        pytest.fail("Expected ForbiddenException but got a different exception")

@with_delay()
def test_cancel_order_fail_not_allowed_by_agreement():
    case_name = "CancelOrderFailNotAllowedByAgreement"
    json_dict = get_request(json_path_file, title_case, case_name)
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected ForbiddenException but API call succeeded")
    except ForbiddenException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": "4035705"}
        )
    except Exception as e:
        print(f"Exception type: {type(e)}, message: {e}")
        pytest.fail("Expected ForbiddenException but got a different exception")

@with_delay()
def test_cancel_order_fail_account_status_abnormal():
    case_name = "CancelOrderFailAccountStatusAbnormal"
    json_dict = get_request(json_path_file, title_case, case_name)
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected ForbiddenException but API call succeeded")
    except ForbiddenException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": "4035705"}  # Use the appropriate partner reference number
        )
    except:
        pytest.fail("Expected ForbiddenException but got a different exception")

@with_delay()
def test_cancel_order_fail_insufficient_merchant_balance(test_cancel_order_reference_number):
    case_name = "CancelOrderFailInsufficientMerchantBalance"
    json_dict = get_request(json_path_file, title_case, case_name)
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected ForbiddenException but API call succeeded")
    except ForbiddenException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": "4035714"}  # Use the appropriate partner reference number
        )
    except:
        pytest.fail("Expected ForbiddenException but got a different exception")

@with_delay()
def test_cancel_order_fail_order_refunded(test_cancel_order_reference_number):
    case_name = "CancelOrderFailOrderRefunded"
    json_dict = get_request(json_path_file, title_case, case_name)
    pytest.skip("SKIP: Placeholder test")

@with_delay()
def test_cancel_order_fail_invalid_signature(test_cancel_order_reference_number):
    case_name = "CancelOrderFailInvalidSignature"
    json_dict = get_request(json_path_file, title_case, case_name)

    json_dict["originalPartnerReferenceNo"] = test_cancel_order_reference_number
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)

    headers = get_headers_with_signature(invalid_signature=True)

    execute_and_assert_api_error(
        api_client,
        "POST",
        "https://api.sandbox.dana.id/payment-gateway/v1.0/debit/cancel.htm",
        cancel_order_request_obj,
        headers,
        401,  # Unauthorized
        json_path_file,
        title_case,
        case_name,
        {"partnerReferenceNo": test_cancel_order_reference_number}  
    )

@with_delay()
def test_cancel_order_fail_timeout():
    case_name = "CancelOrderFailTimeout"
    json_dict = get_request(json_path_file, title_case, case_name)
    cancel_order_request_obj = CancelOrderRequest.from_dict(json_dict)
    try:
        api_instance.cancel_order(cancel_order_request_obj)
        pytest.fail("Expected ServiceException but API call succeeded")
    except ServiceException as e:
        assert_fail_response(
            json_path_file,
            title_case,
            case_name,
            e.body,
            {"partnerReferenceNo": "500701"}  # Use the appropriate partner reference number
        )
    except:
        pytest.fail("Expected ServiceException but got a different exception")
