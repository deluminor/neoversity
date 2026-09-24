const FORM_STORAGE_KEY = 'feedback-form-state';
const FIELD_NAMES = {
  email: 'email',
  message: 'message',
};

const formData = {
  email: '',
  message: '',
};

const formRef = document.querySelector('.feedback-form');

const isFormField = element => {
  return (
    element.name === FIELD_NAMES.email || element.name === FIELD_NAMES.message
  );
};

const isValidStoredData = value => {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.email === 'string' &&
    typeof value.message === 'string'
  );
};

const getStoredFormData = () => {
  const savedState = localStorage.getItem(FORM_STORAGE_KEY);

  if (savedState === null) {
    return null;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (!isValidStoredData(parsedState)) {
      localStorage.removeItem(FORM_STORAGE_KEY);
      return null;
    }

    return {
      email: parsedState.email.trim(),
      message: parsedState.message.trim(),
    };
  } catch (error) {
    console.warn('Failed to parse feedback form state', error);
    localStorage.removeItem(FORM_STORAGE_KEY);
    return null;
  }
};

const updateFormData = ({ email, message }) => {
  formData.email = email;
  formData.message = message;
};

const syncFormFields = () => {
  formRef.elements.email.value = formData.email;
  formRef.elements.message.value = formData.message;
};

const saveFormData = () => {
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
};

const restoreFormState = () => {
  const storedFormData = getStoredFormData();

  if (storedFormData === null) {
    return;
  }

  updateFormData(storedFormData);
  syncFormFields();
};

const handleFormInput = event => {
  if (!isFormField(event.target)) {
    return;
  }

  formData[event.target.name] = event.target.value.trim();
  saveFormData();
};

const resetFormState = () => {
  updateFormData({
    email: '',
    message: '',
  });
  localStorage.removeItem(FORM_STORAGE_KEY);
  formRef.reset();
};

const isFormComplete = () => {
  return formData.email !== '' && formData.message !== '';
};

const handleFormSubmit = event => {
  event.preventDefault();

  if (!isFormComplete()) {
    window.alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });
  resetFormState();
};

restoreFormState();

formRef.addEventListener('input', handleFormInput);
formRef.addEventListener('submit', handleFormSubmit);
