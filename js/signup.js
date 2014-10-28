/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

// Submits the form if it is considered valid
function onSubmit(evt) {
    var valid = validate(this);
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validate(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    if (form.elements['occupation'].value == 'other') {
        valid &= validateRequiredField(form.elements['occupationOther']);
    }
    return valid;
}

function validateRequiredField(field) {
    var value = field.value;
    var valid;
    var patt = new RegExp('^\\d{5}$');
    var errMsg = document.getElementById('birthdateMessage');

    if (value.trim().length > 0) {
        field.className = 'form-control';
        valid = true;
    } else {
        field.className = 'form-control invalid-field';
        valid = false;
    }
    if (field.getAttribute('name') == 'zip' && !patt.test(value)) {
        field.className = 'form-control invalid-field';
        valid = false;
    }
    if (field.getAttribute('name') == 'birthdate' && !validateAge(field)) {
        errMsg.innerHTML = 'You must be 13 years or older to sign up.';
        errMsg.style.display = 'block';
        field.className = 'form-control invalid-field';
        valid = false;
    } else  {
        errMsg.innerHTML = '';
    }
    return valid;
}

function validateAge(field) {
    var date = new Date();
    var birthDate = new Date(field.value);
    var yearDiff = date.getUTCFullYear() - birthDate.getUTCFullYear();
    var monthDiff = date.getUTCMonth() - birthDate.getUTCMonth();
    var dateDiff = date.getUTCDate() - birthDate.getUTCDate();
    if (yearDiff < 13) {
        return false;
    }
    if (monthDiff < 0) {
        return true;
    }
    return dateDiff >= 0;
}

document.addEventListener('DOMContentLoaded', function () {
    // Add states to state selector
    var form = document.getElementById('signup');
    var stateSelect = form.elements['state'];
    usStates.forEach(function(state) {
        var stateOpt = document.createElement('OPTION');
        stateOpt.innerHTML = state.name;
        stateOpt.value = state.code;
        stateSelect.appendChild(stateOpt);
    });

    // Show occupation text field if they choose other.
    var occupationSelect = form.elements['occupation'];
    var occupationInput = form.elements['occupationOther'];
    document.addEventListener('change', function() {
        if(occupationSelect.value == 'other') {
            occupationInput.style.display = 'block';
        } else {
            occupationInput.style.display = 'none';
        }
    });

    // Navigate to another site if they click no thanks
    var noButton = document.getElementById('cancelButton');
    noButton.addEventListener('click', function() {
        if (window.confirm('Are you sure you want to leave this page?')) {
            window.location = 'https://google.com';
        }
    });

    // Submit
    form.addEventListener('submit', onSubmit);

});