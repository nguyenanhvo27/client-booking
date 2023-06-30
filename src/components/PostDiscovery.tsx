import React from 'react'

const PostDiscovery = () => {
  return (
    <div className='flex flex-col'>
    <div className="grid grid-cols-3 gap-3">
      <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://quynhontourist.com/wp-content/uploads/2019/08/lang-van-hoa-du-lich-cong-dong-kon-pring.jpg"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Kon Tum</h1>
        </div>
      </div>
      <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://media.vneconomy.vn/images/upload/2021/11/08/bl.jpg"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Lâm Đồng</h1>
        </div>
      </div>
      <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://ik.imagekit.io/tvlk/blog/2022/12/du-lich-ninh-binh-1.jpg?tr=dpr-2,w-675"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Ninh Bình</h1>
        </div>
      </div>

  </div>
  <div className=" mt-10 grid grid-cols-4 gap-4">
  <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://cdn.tgdd.vn/Files/2021/06/18/1361241/top-10-dia-diem-du-lich-mien-tay-hap-dan-du-khach-202112291737513088.jpg"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Chợ Nổi Cái Răng</h1>
        </div>
      </div>
      <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://cdn.tgdd.vn/Files/2021/06/18/1361241/top-10-dia-diem-du-lich-mien-tay-hap-dan-du-khach-202203281012598534.jpg"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Đồng Tháp</h1>
        </div>
      </div>
      <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://znews-photo.zingcdn.me/w660/Uploaded/sotntb/2022_10_02/Anh_15_gui_zing.jpg"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Quảng Ngãi</h1>
        </div>
      </div> <div className="relative text-white overflow-hidden h-64 rounded-xl ">
        <img
          src="https://i.ex-cdn.com/nhadautu.vn/files/phongcam/2018/07/04/thanh-pho-vinh-nghe-an-1345.jpg"
          alt=""
          className="w-max h-max object-cover"
        />
        <div className="absolute ml-5 bottom-5">
          <h1 className='text-2xl font-semibold'>Nghệ An</h1>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PostDiscovery;