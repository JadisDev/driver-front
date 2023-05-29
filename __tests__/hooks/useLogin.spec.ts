import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import useLogin from '../../src/hooks/login/useLogin';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('useLogin', () => {

  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call localStorage.setItem and navigate when handleSubmit is called', () => {
    const { handleSubmit } = useLogin();
    handleSubmit();

    expect(localStorage.setItem).toHaveBeenCalledWith('login', '1');
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/drivers');
  });

  it('should return correct initialValues, handleSubmit, and signupSchema', () => {
    const { initialValues, handleSubmit, signupSchema } = useLogin();

    expect(initialValues).toEqual({
      login: "",
      password: "",
    });

    expect(handleSubmit).toBeInstanceOf(Function);

    expect(signupSchema).toBeInstanceOf(Yup.object);
  });
});
