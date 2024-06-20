import { useState } from 'react';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'This field is required.';

    if ('email' in fieldValues) {
      temp.email = fieldValues.email ? '' : 'This field is required.';
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email) ? '' : 'Email is not valid.';
    }

    if ('age' in fieldValues) {
      temp.age = fieldValues.age ? '' : 'This field is required.';
      if (fieldValues.age)
        temp.age = fieldValues.age > 0 ? '' : 'Age must be greater than zero.';
    }

    if ('guestName' in fieldValues)
      temp.guestName = values.isAttendingWithGuest && !fieldValues.guestName ? 'This field is required.' : '';

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    setValues,
  };
};

export default useForm;
