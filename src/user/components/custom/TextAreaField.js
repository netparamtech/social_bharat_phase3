// MobileNumberInput.js
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';

const TextAreaField = ({ handleChange, value, errorServer, label, isAutoFocused, isRequired, fieldName, placeholder, isDisabled, maxLength }) => {
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
        if (maxLength) {
            if (val.length > maxLength-1)
                return 'Maximum length is 400 characters.';
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
            <TextArea
                type="text"
                name="text"
                id="name"
                value={value}
                placeholder={placeholder}
                className="input-height"
                onChange={onChange}
                autoFocus={isAutoFocused}
                style={{ borderColor: error || isServerErr ? 'red' : '', borderRadius: '5px' }}
                maxLength={maxLength}
                disabled={isDisabled}
            />
            {error && <span className='error mt-1'>{error}</span>}
            {!error && isServerErr && errorServer && <span className='error mt-1'>{errorServer}</span>}
        </>
    );
};

export default TextAreaField;
