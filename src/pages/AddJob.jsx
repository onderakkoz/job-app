import React from 'react'
import AutoInput from '../components/AutoInput'
import Select from '../components/Select'
import { statusOpt, typeOpt } from '../constants'
import SubmitButton from '../components/SubmitButton'
import api from "../utils/api"
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { createJob, setError } from '../app/slices/jobSlice'
import { useNavigate } from 'react-router-dom'

const AddJob = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log("tiklandi");

    

// form data olusturma
    const formData = new FormData(e.target)
    // console.log(formData);
    const newJobData = Object.fromEntries(formData.entries())
    newJobData.id= v4();
    newJobData.date= Date.now();
    console.log(newJobData);

    api.post("/jobs", newJobData).then(() =>{
      toast.success('İş Başarıyla Eklendi.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        // store'a yeni veriyi kaydet
        dispatch(createJob(newJobData))
        //islem basarili olursa anasayfaya yonlendir.
        navigate("/")

    }).catch((err)=> {
      dispatch(setError(err.message))
    toast.error('İş Eklenirken bir hata oluştu.', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
     
      })})

  }
 

  return (
    <div className='add-page'>
     <section className='container'>
      <h2>Yeni İş Ekle</h2>

      <form onSubmit={handleSubmit}>
        <AutoInput label={"Pozisyon"} name="position"/>
        <AutoInput label={"Şirket"} name="company"/>
        <AutoInput label={"Lokasyon"} name="location"/>

        <Select label={"Durum"} options={statusOpt} name="status"/>
        <Select label="Tür" options={typeOpt} name="type"/>

        <div>
          <SubmitButton text={"Oluştur"}/>
        </div>
      </form>
     </section>
    </div>
  )
}

export default AddJob