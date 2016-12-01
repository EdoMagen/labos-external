var tests =  [];
var baseUrl = 'http://stdemo11:85/s/order';
//var baseUrl = 'http://stdemo11:85/s/facility/';
var apiToken = _getParameterByName('apiToken');
// alert('apiToken: ' + apiToken);

var mockOrderPayload = {
    "stat": true,
    "creationDate": {
        "dateTime": "01-03-1980 08:00:00",
        "formattedDate": "03/01/1980",
        "formattedTime": "08:00 AM"
    },
    "facility": {
        "code": 1234,
        "name": "Abaci Faika United Kingdom"
    },
    "physician": {
        "code": 1368,
        "name": "Marquit Harold",
        "firstName": "Marquit",
        "lastName": "Harold",
        "isLinked": "true",
        "inactive": "false",
        "defaultIdType": "string"
    },
    "patient": {
        "code": 46742,
        "firstName": "Gal",
        "lastName": "Montgomery",
        "middleName": "Burns",
        "fullName": "Gal Burns Montgomery",
        "defaultId": "1256325412",
        "birthYear": 2013,
        "age": "2Y"
    },
    "requests": [
        {
            "test": {
                "code": 12048,
                "name": "PROT,UR",
                "longName": "Protein, Urine"
            },
            "parent": {
                "test": {
                    "code": 12048,
                    "name": "PROT,UR",
                    "longName": "Protein, Urine"
                },
                "serialTime": 30
            },
            "serialTime": 30,
            "stat": false,
            "comments": [
                {
                    "internalCode": 9800018,
                    "code": 18,
                    "text": "This requisition form replaces all previous form.",
                    "category": 98,
                    "type": 0,
                    "printable": true,
                    "entity": "PATIENT",
                    "deletable": true
                }
            ],
            "diagnosis": [
                {
                    "internalCode": 9800018,
                    "code": 18,
                    "text": "This requisition form replaces all previous form.",
                    "category": 98,
                    "type": 0,
                    "printable": true,
                    "entity": "PATIENT",
                    "deletable": true
                }
            ]
        }
    ],
    "comments": [
        {
            "internalCode": 9800018,
            "code": 18,
            "text": "This requisition form replaces all previous form.",
            "category": 98,
            "type": 0,
            "printable": true,
            "entity": "PATIENT",
            "deletable": true
        }
    ],
    "diagnosis": [
        {
            "internalCode": 9800018,
            "code": 18,
            "text": "This requisition form replaces all previous form.",
            "category": 98,
            "type": 0,
            "printable": true,
            "entity": "PATIENT",
            "deletable": true
        }
    ]
}
var orderPayload = {
    "stat": true,
    "facility": {
        "code": 1234,
        "name": "Abaci Faika United Kingdom"
    },
    "physician": {
        "code": 1368,
        "name": "Marquit Harold",
        "firstName": "Marquit",
        "lastName": "Harold",
        "isLinked": "true",
        "inactive": "false",
        "defaultIdType": "string"
    },
    "patient": {
        "code": 46742,
        "firstName": "Gal",
        "lastName": "Montgomery",
        "middleName": "Burns",
        "fullName": "Gal Burns Montgomery",
        "defaultId": "1256325412",
        "birthYear": 2013,
        "age": "2Y"
    },
    "requests": [
        {
            "test": {
                "code": 12048,
                "name": "PROT,UR",
                "longName": "Protein, Urine"
            }
        }
    ]
}

var currentPatient;
var currentPhysician;
var currentFacility;

function _getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {
    $('select').material_select();
});

function onButtonClick(event) {
    // Get from input + encodeUriComponent
    event.preventDefault();
    buildFormData();
    sendOrder();
}

function getPatientsList() {
    // gets physician list
}

function getPhysiciansList() {
    // gets physician list
}

function getFacilitiesList() {
    // gets facilities list
}

function buildFormData() {
    // Take patient, facility,
    // physician and tests and send to BE
    orderPayload.patient = currentPatient;
    orderPayload.facility = currentFacility;
    orderPayload.physician = currentPhysician;

}
function sendOrder(facility, physician, patient) {
    $.ajax({
        url: baseUrl,
        method: 'POST',
        headers: {
            'X-Laas-Session-Token': apiToken
        },
        success: function(data) {
            order = data.order[0];
            $("#content-placeholder").html(template(order));
        },
        error: function() {
        }
    });
}
