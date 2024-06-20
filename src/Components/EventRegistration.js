// EventRegistrationForm.js
import React, { useState } from 'react';
import useForm from './useForm';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007bff;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SubmissionSummary = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #e9ffe9;
  border-radius: 5px;
  border: 1px solid #d4ffd4;
`;

const EventRegistrationForm = () => {
  const initialState = {
    name: '',
    email: '',
    age: '',
    isAttendingWithGuest: false,
    guestName: '',
  };

  const { values, errors, handleChange, validate } = useForm(initialState);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(values);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Name</StyledLabel>
        <StyledInput type="text" name="name" value={values.name} onChange={handleChange} />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

        <StyledLabel>Email</StyledLabel>
        <StyledInput type="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

        <StyledLabel>Age</StyledLabel>
        <StyledInput type="number" name="age" value={values.age} onChange={handleChange} />
        {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}

        <StyledLabel>
          Are you attending with a guest?
          <StyledInput
            type="checkbox"
            name="isAttendingWithGuest"
            checked={values.isAttendingWithGuest}
            onChange={handleChange}
          />
        </StyledLabel>
        {values.isAttendingWithGuest && (
          <>
            <StyledLabel>Guest Name</StyledLabel>
            <StyledInput type="text" name="guestName" value={values.guestName} onChange={handleChange} />
            {errors.guestName && <ErrorMessage>{errors.guestName}</ErrorMessage>}
          </>
        )}
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>

      {submittedData && (
        <SubmissionSummary>
          <h2>Submission Summary</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Attending with a guest:</strong> {submittedData.isAttendingWithGuest ? 'Yes' : 'No'}</p>
          {submittedData.isAttendingWithGuest && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </SubmissionSummary>
      )}
    </FormContainer>
  );
};

export default EventRegistrationForm;
