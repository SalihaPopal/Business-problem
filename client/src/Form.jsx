import './App.css';
import React from "react";
import {useForm} from 'react-hook-form';


function RegistrationForm() {

  const{register, handleSubmit, formState:{errors}}=useForm();
  const onSubmit = (data) => console.log(data);
  // console.log(watch('name'));

  return (
    <div className="App">
      <section>
        <div className='register'>
          <div className='col-1'>
            <h2>Sign In</h2> 
            <span>Register Here</span>

            <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <input type='text' {...register('fullName', { required: true })} className='input' placeholder='FullName'
                      id="firstName"
                      aria-invalid={errors.firstName ? "true" : "false"}
                      // {...register("firstName", { required: true })}
              />
               {errors.firstName && <span role="alert">This field is required</span>}

              <input type='text' {...register('email', { required: true })} className='input' placeholder='Email address'
                      id="email"
                      aria-invalid={errors.email ? "true" : "false"}
                      // {...register("email", { required: true })}              
              />
              {errors.firstName && <span role="alert">This field is required</span>}

              <input type='text' {...register('phone', { required: true })} className='input' placeholder='Phone number'
                      id="phone"
                      aria-invalid={errors.email ? "true" : "false"}
                      // {...register("phone", { required: true })}               
              />
              {errors.phone && <span role="alert">This field is required</span>}
              {/* {errors.phone?.type==="required"&&"Phone number is required."} */}

              <button>Sign Up</button>
            </form>
           <div className='col-3'>
           
           </div>
          </div>
        </div>
      </section>
      <handler />
    </div>
  );
}

export default RegistrationForm;




