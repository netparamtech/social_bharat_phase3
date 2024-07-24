// MobileNumberInput.js
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

const PasswordField = ({ handleChange, confPass, value, errorServer, label, isAutoFocused, isRequired, fieldName, placeholder, minLength, htmlFor }) => {
    const [error, setError] = useState('');
    const [isServerErr, setIsServerErr] = useState(false);
    const validateMobile = (val) => {
        setIsServerErr(false);
        if (isRequired && !val) {
            return `${fieldName} is Required.`;
        }
        if (!isRequired && !val) {
            return '';
        }
        if (htmlFor === 'password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
            if (!passwordRegex.test(val)) {
                return `Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and no spaces.`;
            }
        }
        if (confPass) {
            if (val !== confPass) {
                return 'Password confirmation does not match.';
            }
        }
        if (minLength) {
            if (val.length < minLength) {
                return `${fieldName} must be at least ${minLength} characters long.`;
            }
        }
        return '';
    }
    const onChange = (e) => {
        const valueIn = e.target.value;
        const errorMsg = validateMobile(valueIn);
        setError(errorMsg);
        handleChange(e, errorMsg);
    }
    useEffect(() => {
        if (errorServer) {
            setIsServerErr(true);
        } else {
            setError('');
            setIsServerErr(false);
        }
    }, [errorServer]);
    return (
        <>
            {
                label && <label className="form-label">{label}{isRequired && <span className="text-danger">{" "}*</span>}</label>
            }
            <Input.Password
                type="password"
                name="password"
                id="password"
                value={value}
                placeholder={placeholder}
                className="input-height"
                onChange={onChange}
                autoFocus={isAutoFocused}
                style={{ borderColor: error || isServerErr ? 'red' : '', borderRadius: '5px' }}
                minLength={minLength}
            />
            {error && <span className='error mt-1'>{error}</span>}
            {!error && isServerErr && errorServer && <span className='error mt-1'>{errorServer}</span>}
        </>
    );
};

export default PasswordField;
