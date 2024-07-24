// MobileNumberInput.js
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { checkMobile } from '../../services/userService';

const MobileInput = ({ handleMobileChange, htmlFor, value, errorServer, label, isAutoFocused, isRequired, isDisabled, placeholder }) => {
    const [error, setError] = useState('');
    const [isServerErr, setIsServerErr] = useState(false);
    const [bError, setBerror] = useState('');
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

    const validatedMobileServer = async (val) => {
        try {
            const data = {
                mobile: val,
            }
            const response = await checkMobile(data);
            if (response && response.status === 200) {
                const { isValid, message } = response.data;
                if (!isValid) {
                    console.log(message)
                    return message || 'Mobile number is not registered.';
                }
                return '';

            }
        } catch (error) {
            console.error('Error checking mobile number:', error);
            return 'Unable to verify mobile number.';
        }
    }
    const validatedMobileServerForRegistered = async (val) => {
        try {
            const data = {
                mobile: val,
            }
            const response = await checkMobile(data);
            if (response && response.status === 200) {
                const { isValid, message } = response.data;
                if (isValid) {
                    console.log(message)
                    return message || 'Mobile number is already registered.';
                }
                return '';

            }
        } catch (error) {
            console.error('Error checking mobile number:', error);
            return 'Unable to verify mobile number.';
        }
    }
    const validatedMobileServerForUpdate = async (val) => {
        try {
            const data = {
                mobile: val,
            }
            const response = await checkMobile(data);
            if (response && response.status === 200) {
                const { isValid, message } = response.data;
                if (isValid) {
                    console.log(message)
                    return 'Mobile number is not available.';
                }
                return '';

            }
        } catch (error) {
            console.error('Error checking mobile number:', error);
            return 'Unable to verify mobile number.';
        }
    }

    const onChange = async (e) => {
        const valueIn = e.target.value;
        const localError = validateMobile(valueIn);
        setError(localError);

        if (!localError && valueIn.length === 10 && htmlFor === 'login') {
            const serverError = await validatedMobileServer(valueIn);
            setError(serverError);
            setIsServerErr(!!serverError);
            handleMobileChange(e, serverError);
        } else if (!localError && valueIn.length === 10 && htmlFor === 'register') {
            const serverError = await validatedMobileServerForRegistered(valueIn);
            setError(serverError);
            setIsServerErr(!!serverError);
            handleMobileChange(e, serverError);
        }else if (!localError && valueIn.length === 10 && htmlFor === 'update') {
            const serverError = await validatedMobileServerForUpdate(valueIn);
            setError(serverError);
            setIsServerErr(!!serverError);
            handleMobileChange(e, serverError);
        } else {
            setIsServerErr(false);
            handleMobileChange(e, localError);
        }
    };
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
