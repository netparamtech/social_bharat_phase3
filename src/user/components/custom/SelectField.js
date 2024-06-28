import Select from "react-select";
import React, { useEffect, useState } from 'react';


const SelectField = ({ handleSelectChange,options, value, errorServer, label, isAutoFocused, isRequired, fieldName, placeholder, isDisabled, isMulti,defaultValue }) => {
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
        if (val.length > 200) {
            return 'Maximum length is 200 characters.';
        }
        return '';
    }
    const onChange = (value) => {
        const valueIn = value.label;
        const errorMsg = validateMobile(valueIn);
        setError(errorMsg);
        handleSelectChange(value);
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'blue' : (error || isServerErr ? 'red' : provided.borderColor),
            '&:hover': {
                borderColor: state.isFocused ? 'blue' : (error || isServerErr ? 'red' : provided['&:hover'].borderColor),
            },
            borderRadius: '5px',
        }),
        // You can add more styles overrides for other parts of the select component
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
           {
            defaultValue?(
                <Select
                id="community_id"
                isMulti={isMulti}
                className=""
                defaultValue={defaultValue} // Provide a selected option state
                onChange={onChange} // Your change handler function
                options={
                    options
                }
                placeholder={placeholder}
                styles={customStyles}
            />
            ):(
                <Select
                id="community_id"
                isMulti={isMulti}
                className=""
                value={value}
                onChange={onChange} // Your change handler function
                options={
                    options
                }
                placeholder={placeholder}
                styles={customStyles}
            />
            )
           }
            {error && <span className='error mt-1'>{error}</span>}
            {!error && isServerErr && errorServer && <span className='error mt-1'>{errorServer}</span>}
        </>
    );
};

export default SelectField;
