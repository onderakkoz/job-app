import React from 'react'
import { useSelector } from 'react-redux'


const AutoInput = ({label,name}) => {
    // console.log(label);
    // console.log(name);

    const {jobs} = useSelector(store => store)
    // console.log(jobs);

    //1. sadece posizyon degerlerinden olusan bir dizi tanimladik
    const arr = jobs.map((job)=> job[name])
    // console.log(arr);

    //2. diziden tekrar eden elemanlari kaldirdik 
    const filtredSet = new Set(arr)
    // Set'in dondurdugu objeyi diziye cevirir.
    const options = Array.from(filtredSet)

  return (
    <div>
       <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={name} required />

      <datalist >
        {options.map((i)=>(
          <option key={i} value={i}></option>
        ))}
      </datalist>

    </div>
  )
}

export default AutoInput