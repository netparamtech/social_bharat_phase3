import React, { useEffect, useState } from 'react';


const SelectField = ({ handleSelectChange, options, value, errorServer, label, isAutoFocused, isRequired, fieldName, placeholder, isDisabled, isMulti, defaultValue,classname }) => {
    const [error, setError] = useState('');
    const [isServerErr, setIsServerErr] = useState(false);
    const validateSelect = (val) => {
        setIsServerErr(false);
        if (isRequired && !val) {
            return `${fieldName} is Required.`;
        }
        if (!isRequired && !val) {
            return '';
        }
        if (val.length > 200) {
            return 'Maximum length is 200 characters.';
        }
        return '';
    }
    const onChange = (value) => {
        const valueIn = value;
        const errorMsg = validateSelect(valueIn);
        setError(errorMsg);
        handleSelectChange(valueIn,errorMsg);
    }

    const getBorderColor = () => {
        if (isServerErr || error) return 'red';
        return '';
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
            <select
                className={`form-select ${classname}`}
                id="community_id"
                value={value} // Provide a selected option state
                onChange={onChange} // Your change handler function
                placeholder={placeholder}
                style={{
                    borderColor: getBorderColor(),
                    borderRadius: '5px',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                }}
            >
                <option value=''>Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className='error mt-1'>{error}</span>}
            {!error && isServerErr && errorServer && <span className='error mt-1'>{errorServer}</span>}
        </>
    );
};

export default SelectField;
