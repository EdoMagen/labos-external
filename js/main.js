// Variables / members
var baseUrl = 'http://saaslims1:90/s/';
var apiToken = _getParameterByName('apiToken');

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

var patientList;
var physicianList;
var facilityList;
var testsList;
var requestsList = [];

// Helper function to extract apiToken from the query string
// We use apiToken in all of our requests for authentication
// apiToken is received from labOS.
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

// Methods to get the items we need to populate our form
function getPatientsList() {
    // gets physician list
    $.ajax({
        url: baseUrl + 'patient',
        method: 'GET',
        headers: {
            'X-Laas-Session-Token': apiToken
        },
        success: function(data) {
            patientList = data.patient;
            patientList.forEach(function(patient){
                // console.log(patient);
                if(patient.fullName) {
                    document.getElementById('patient-select').innerHTML += '<option value="'+patient.code+'">'+patient.fullName+'</option>';
                }
            });
            $('select').material_select();
            // console.log('patientList: ', patientList);
        },
        error: function(e) {
            console.error('API error: ', e.responseJSON.errorMessage);
        }
    });
}

function getPhysiciansList() {
    // gets physician list
    $.ajax({
        url: baseUrl + 'physician',
        method: 'GET',
        headers: {
            'X-Laas-Session-Token': apiToken
        },
        success: function(data) {
            physicianList = data.physician;
            physicianList.forEach(function(physician){
                if(physician.name) {
                    document.getElementById('physician-select').innerHTML += '<option value="'+physician.code+'">'+physician.name+'</option>';
                }
            });
            $('select').material_select();
        },
        error: function(e) {
            console.error('API error: ', e.responseJSON.errorMessage);
        }
    });
}

function getFacilitiesList() {
    // gets facilities list
    $.ajax({
        url: baseUrl + 'facility',
        method: 'GET',
        headers: {
            'X-Laas-Session-Token': apiToken
        },
        success: function(data) {
            facilityList = data.facility;
            facilityList.forEach(function(facility){
                if(facility.name) {
                    document.getElementById('facility-select').innerHTML += '<option value="'+facility.code+'">'+facility.name+'</option>';
                }
            });
            $('select').material_select();
        },
        error: function(e) {
            console.error('API error: ', e.responseJSON.errorMessage);
        }
    });
}

function getTestsList() {
    // gets physician list
    $.ajax({
        url: baseUrl + 'test',
        method: 'GET',
        headers: {
            'X-Laas-Session-Token': apiToken
        },
        success: function(data) {
            testsList = data.test;
            testsList.forEach(function(test){
                if(test.name != "") {
                    document.getElementById('tests-container').innerHTML += '<div class="col s6"><input type="checkbox" class="filled-in" id="'+test.code+'"/><label for="'+test.code+'">'+test.longName+'</label></div>';
                }
            });
        },
        error: function(e) {
            console.error('API error: ', e.responseJSON.errorMessage);
        }
    });
}

// Methods to send our order to be saved by BE
function onButtonClick(event) {
    event.preventDefault();
    buildPayload();
    sendOrder();
}

function buildPayload() {
    // Build patient, facility, physician and tests objects
    // and prepare them for submission
    requestsList = [];
    document.querySelectorAll('#tests-container input[type="checkbox"]:checked').forEach(function(test){
        var testToAdd = {test: {}};
        testToAdd.test.code = +test.id;
        requestsList.push(testToAdd);
    });

    orderPayload.patient.code = +document.querySelector('#patient-select').value;
    orderPayload.facility.code = +document.querySelector('#facility-select').value;
    orderPayload.physician.code = +document.querySelector('#physician-select').value;
    orderPayload.requests = requestsList;
}

function sendOrder() {
    $.ajax({
        url: baseUrl + 'order',
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(orderPayload),
        headers: {
            'X-Laas-Session-Token': apiToken
        },
        success: function(data) {
            console.info('ORDER SAVED!\n', data)
            $('#order-created-span').text(data.order[0].orderName);
            $('.modal').modal('open');
        },
        error: function(e) {
            console.error('API error: ', e.responseJSON.errorMessage);
        }
    });
}

// Initialize
$(document).ready(function() {
    getPatientsList();
    getPhysiciansList();
    getFacilitiesList();
    getTestsList();
    $('.modal').modal();
    $('select').material_select();
});
