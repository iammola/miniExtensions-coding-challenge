import { useSelector, useDispatch } from 'react-redux';
import React, { FunctionComponent, FormEvent, ChangeEvent } from 'react';

import { FormProps } from 'types';

import { selectValue, setValue } from './formSlice';

const Form: FunctionComponent<FormProps> = ({ onSubmit, error }) => {
  const value = useSelector(selectValue);
  const dispatch = useDispatch();

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(setValue(''));
    onSubmit(value.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <span className="login__title">Student's name</span>
      <input
        required
        type="text"
        value={value}
        onChange={e => dispatch(setValue(e.target.value))}
      />
      <span className="login__error">{error}</span>
      <button type="submit">Login</button>
    </form>
  );
};

export default Form;
