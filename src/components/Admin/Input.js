 export default function Input({type,value,name,header,id,onBlur,onChange,dispatch,placeholder}) {
  return (
    <label htmlFor={name}>
    {header}
       {type==='input'&&<input
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    dispatch={dispatch}
                  />}
                  {type==='textarea'&&<textarea
                    name={name}
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    dispatch={dispatch}
                  />}
    </label>
  )

}