const inputFields = document.querySelectorAll('input');
const errorMsgs = document.querySelectorAll('.error-msg');

const myForm = document.querySelector('form');
const firstName = document.querySelector('#first');
const lastName = document.querySelector('#last');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const pwd = document.querySelector('#pwd');
const retypedPwd = document.querySelector('#pwd_retype');
const thankyou = document.querySelector('.thankyou');

const submitBtn = document.querySelector('#submit-btn');

let allFieldsValidity = new Array(6).fill(false);

/*
  Focused input label animation
*/
const onFocus = (e) => {
  e.target.parentElement.classList.add('focused');
}

const onBlur = (e) => {
  if (e.target.value === '') {
    e.target.parentElement.classList.remove('focused');
  }
}

inputFields.forEach(el => {
  el.addEventListener('focus', onFocus)
  el.addEventListener('blur', onBlur)
})

/*
  Password matching logic
*/
const testPwdEquality = () => {
  if (pwd.value === '' || retypedPwd === '') {
    pwd.parentElement.classList.add('error');
    errorMsgs[4].textContent = 'This field is required';
    return false;
  }
  // display an error message if passwords do not match.
  else if (pwd.value !== retypedPwd.value) {
    retypedPwd.parentElement.classList.add('error');
    errorMsgs[4].textContent = 'Passwords do not match';
    errorMsgs[5].textContent = 'Passwords do not match';
    return false;
  } 
  else if (pwd.value === retypedPwd.value) {
  // return styling to normal if passwords match
    pwd.parentElement.classList.remove('error');
    retypedPwd.parentElement.classList.remove('error');
    errorMsgs[4].textContent = '';
    errorMsgs[5].textContent = '';
    return true
  }
}

/*
  Required inputs logic
*/
function validateRequired(e) {
  if (e.target.value === '') {
    e.target.parentElement.classList.add('error');
    e.target.nextElementSibling.textContent = 'This field is required';
    return false;
  } else if (e.target.value !== '') {
    e.target.parentElement.classList.remove('error');
    e.target.nextElementSibling.textContent = '';
    return true 
  }  
}

/*
  Input event listeners
*/
firstName.addEventListener('change', (e) => {
  allFieldsValidity[0] = validateRequired(e);
})

lastName.addEventListener('change', (e) => {
  allFieldsValidity[1] = validateRequired(e);
})

email.addEventListener('change', (e) => {
  allFieldsValidity[2] = validateRequired(e);
})

phone.addEventListener('change', (e) => {
  allFieldsValidity[3] = validateRequired(e);
})

pwd.addEventListener('change', (e) => {
  allFieldsValidity[4] = testPwdEquality()
});

retypedPwd.addEventListener('change', (e) => {
  allFieldsValidity[5] = testPwdEquality();
});

/*
  Form submit button logic
*/
function validateAllFields() {
  inputFields.forEach(el => {
    const event = new InputEvent('change');
    el.dispatchEvent(event);
  });
  let allValid = allFieldsValidity.reduce(
    (acc, curr) => curr && acc,
    true
  );
  return allValid;
}

// Give user feedback if form submitted successfully
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (validateAllFields()) {
    thankyou.textContent = 'Thank you for signing up!';
    myForm.reset();
  };
})
