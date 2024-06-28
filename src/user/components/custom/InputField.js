// MobileNumberInput.js
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

const InputField = ({ handleChange, value, errorServer, label, isAutoFocused, isRequired, fieldName, placeholder, isDisabled, maxLength, type, minLength }) => {
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
        if (minLength) {
            if (val.length < minLength) {
                return `${fieldName} must be at least ${minLength} characters long.`;
            }
        }
        if (val.length > maxLength) {
            return `Maximum length is ${maxLength} characters.`;
        }
        return '';
    }
    const onChange = (e) => {
        let valueIn = e.target.value;
        valueIn = valueIn.replace(/\d/g, '');
        const errorMsg = validateMobile(valueIn);
        setError(errorMsg);
        handleChange(e);
    }
    const onKeyPress = (e) => {
        const char = String.fromCharCode(e.which);
        // Allow backspace, space, and alphabetical characters
        let regex = '';
        if (type === "numeric") {
            regex = /[0-9]/;
        } else if (type === "text") {
            regex = /[a-zA-Z]/;
        } else {
            regex = /[a-zA-Z0-9]/;
        }
        if (e.keyCode === 8 || e.keyCode === 32 || regex.test(char)) {
            return;
        }
        e.preventDefault();
    };
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
            <Input
                type="text"
                name="text"
                id="name"
                value={value}
                placeholder={placeholder}
                className="input-height"
                onChange={onChange}
                autoFocus={isAutoFocused}
                onKeyDown={onKeyPress}
                style={{ borderColor: error || isServerErr ? 'red' : '', borderRadius: '5px' }}
                maxLength={maxLength}
                disabled={isDisabled}
            />
            {error && <span className='error mt-1'>{error}</span>}
            {!error && isServerErr && errorServer && <span className='error mt-1'>{errorServer}</span>}
        </>
    );
};

export default InputField;
