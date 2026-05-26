const FORM_STORAGE_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

const formRef = document.querySelector('.feedback-form');

const isValidStoredData = value => {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.email === 'string' &&
    typeof value.message === 'string'
  );
};

const restoreFormState = () => {
  const savedState = localStorage.getItem(FORM_STORAGE_KEY);

  if (savedState === null) {
    return;
  }

  try {
    const parsedState = JSON.parse(savedState);

    if (!isValidStoredData(parsedState)) {
      localStorage.removeItem(FORM_STORAGE_KEY);
      return;
    }

    formData.email = parsedState.email.trim();
    formData.message = parsedState.message.trim();
    formRef.elements.email.value = formData.email;
    formRef.elements.message.value = formData.message;
  } catch (error) {
    console.warn('Failed to restore feedback form state', error);
    localStorage.removeItem(FORM_STORAGE_KEY);
  }
};

const handleFormInput = event => {
  const { name, value } = event.target;

  if (!(name in formData)) {
    return;
  }

  formData[name] = value.trim();
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
};

const resetFormState = () => {
  formData.email = '';
  formData.message = '';
  localStorage.removeItem(FORM_STORAGE_KEY);
  formRef.reset();
};

const handleFormSubmit = event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    window.alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });
  resetFormState();
};

restoreFormState();

formRef.addEventListener('input', handleFormInput);
formRef.addEventListener('submit', handleFormSubmit);
