import React from 'react'
const MailList = () => {
  return (
    <div className="w-full mt-12 bg-blue-900 text-white flex flex-col items-center p-12 gap-5">
      <h1 className="text-3xl font-medium">Bạn có khách sạn của riêng mình!</h1>
      <span className="mailDesc">Đăng ký tài khoản để đăng chỗ nghỉ của bạn</span>
      <div >
       <a href='/register?role=hotelier'>
       <button  className="h-12 w-52 bg-blue-950 text-white font-medium rounded cursor-pointer border-none">Đăng ký</button>
       </a>
         </div>
    </div>
  )
}

export default MailList;