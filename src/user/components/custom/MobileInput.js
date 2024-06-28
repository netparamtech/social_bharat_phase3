// MobileNumberInput.js
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

const MobileInput = ({ handleMobileChange, value, errorServer, label, isAutoFocused, isRequired, isDisabled, placeholder }) => {
    const [error, setError] = useState('');
    const [isServerErr, setIsServerErr] = useState(false);
    const validateMobile = (val) => {
        setIsServerErr(false);
        if (isRequired && !val) {
            return "Mobile Number is Required.";
        }
        if (!isRequired && !val) {
            return '';
        }
        if (!/^\d*$/.test(val)) {
            return "Mobile number must contain only numbers.";
        }
        if (val.length !== 10) {
            return 'Mobile number must be exactly 10 digits.';
        }
        if (!/^[6789]/.test(val)) {
            return 'Mobile number must start with 6, 7, 8, or 9.';
        }
        return '';
    }

    const onChange = (e) => {
        const valueIn = e.target.value;
        const errorMsg = validateMobile(valueIn);
        setError(errorMsg);
        handleMobileChange(e);

    }
    const handleKeyDown = (e) => {
        // Allow only numeric keys, backspace, delete, arrow keys, and tab
        if (
            !(
                (e.key >= '0' && e.key <= '9') ||
                e.key === 'Backspace' ||
                e.key === 'Delete' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Tab'
            )
        ) {
            e.preventDefault();
        }
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
                type="text" // Use "text" to handle the input restriction manually
                name="mobile"
                id="mobile"
                value={value}
                placeholder={placeholder}
                className="input-height w-100"
                onChange={onChange}
                autoFocus={isAutoFocused}
                disabled={isDisabled}
                style={{ borderColor: error || isServerErr ? 'red' : '', borderRadius: '5px' }}
                onKeyDown={handleKeyDown}
                maxLength={10}
                inputMode="numeric" // This makes sure the numeric keypad appears on mobile devices
                pattern="[0-9]*" // Additional validation to ensure only numeric input
            />
            {error && <span className='error mt-1'>{error}</span>}
            {!error && isServerErr && errorServer && <span className='error mt-1'>{errorServer}</span>}
        </>
    );
};

export default MobileInput;
