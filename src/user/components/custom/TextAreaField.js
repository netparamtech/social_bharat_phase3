// MobileNumberInput.js
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';

const TextAreaField = ({ handleChange, value, errorServer, boxFor, label, isAutoFocused, isRequired, fieldName, placeholder, isDisabled, maxLength }) => {
    const [error, setError] = useState('');
    const [isServerErr, setIsServerErr] = useState(false);
    const validateField = (val) => {
        setIsServerErr(false);

        if (isRequired && !val) {
            return `${fieldName} is required.`;
        }
        if (!isRequired && !val) {
            return '';
        }
        if (maxLength && val.length > maxLength) {
            return `Maximum length is ${maxLength} characters.`;
        }
        if (boxFor) {
            if (boxFor === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;
                if (!emailRegex.test(val)) {
                    return `Please enter a valid email address.`;
                }
            }
            if (boxFor === 'link') {
                const urlPattern = new RegExp(
                  '^(https?:\\/\\/)' + // protocol
                  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name and extension
                  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                  '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
                );
                if (!urlPattern.test(val)) {
                  return `Please enter a valid URL.`;
                }
              }
        }
        return '';
    };

    const onChange = (e) => {
        let valueIn = e.target.value;
        valueIn = valueIn.replace(/\d/g, '');
        const errorMsg = validateField(valueIn);
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
