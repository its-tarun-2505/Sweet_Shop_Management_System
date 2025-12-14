const InputField = (props) => {
    const { label, id, type, value, onChange, placeholder, ...rest } = props;
    return (
        <div style={{ marginBottom: '1rem' }}>
            {label && 
                <label htmlFor={id}>
                    {label} 
                    {props.required && <sup>*</sup>}
                </label>
            } <br/>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
                style={{ width: '100%', padding: '8px' }}
            />
        </div>
    );
};

export default InputField;
