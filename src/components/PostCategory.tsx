import React from "react";

const PostCategory = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-3">
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="https://cdn.tgdd.vn/Files/2021/06/22/1362277/tat-tan-tat-kinh-nghiem-du-lich-da-lat-checkin-o-dau-an-gi-202206031411593741.jpeg"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Đà Lạt</h1>
          </div>
        </div>
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="https://statics.vinpearl.com/du-lich-da-nang_1657939501.JPG"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Đà nẵng</h1>
          </div>
        </div>
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="https://vietnamstaytravel.com/wp-content/uploads/202212261754-ban-do-du-lich-ha-giang-11-min-1840x980.png"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Hà Giang</h1>
          </div>
        </div>
      </div>
      <div className=" mt-10 grid grid-cols-4 gap-4">
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="https://www.vietnambooking.com/wp-content/uploads/2017/10/du-lich-binh-dinh-26-10-2017.jpg"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Bình Định</h1>
          </div>
        </div>
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="https://go2joy.s3.ap-southeast-1.amazonaws.com/blog/wp-content/uploads/2022/07/14151347/gioi-thieu-canh-dep-phu-quoc.jpg"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Phú Quốc</h1>
          </div>
        </div>
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="http://www.dulichhoanggia.com.vn/Uploads/ThuongVT/image%20(8).png"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Vũng Tàu</h1>
          </div>
        </div>{" "}
        <div className="relative text-white overflow-hidden h-64 rounded-xl ">
          <img
            src="https://vcdn1-dulich.vnecdn.net/2022/05/06/cot-co-Ha-Noi-Ca-Mau-Chu-Duc-V-6071-8791-1651827809.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=7H1P7hAe_CG8OfEkLUCJvw"
            alt=""
            className="w-max h-max object-cover"
          />
          <div className="absolute ml-5 bottom-5">
            <h1 className="text-2xl font-semibold">Cà Mau</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCategory;
