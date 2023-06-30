import React from "react";
import { FaCcPaypal } from "react-icons/fa";

type Props = {};

function Footer({}: Props) {
  return (
    <div className=" text-base text-center">
      <div className="w-full inline-flex justify-between mb-12">
        <ul className="list-none">
          <li className="mb-3 text-2xl font-semibold text-black cursor-pointer">
            Dịch vụ tiện ích cơ bản
          </li>
          <li className="mb-3 text-black cursor-pointer">Đặt phòng</li>
          <li className="mb-3 text-black cursor-pointer">Đăng phòng</li>
          <li className="mb-3 text-black cursor-pointer">Thanh toàn online</li>
        </ul>
        <ul className="list-none">
          <li className="mb-3 text-2xl font-semibold text-black cursor-pointer">
            Thông tin liên hệ{" "}
          </li>
          <li className="mb-3 text-black cursor-pointer">
            Địa chỉ: 180 Cao Lỗ Phường 4 quận 8, TP.HCCM{" "}
          </li>
          <li className="mb-3 text-black cursor-pointer">
            Điện thoại: 0357999999{" "}
          </li>
          <li className="mb-3 text-black cursor-pointer">
            Gmail:stu@gmial.com
          </li>
        </ul>
        <ul className="list-none">
          <li className="mb-3 text-2xl font-semibold text-black cursor-pointer">
            Thanh Toán
          </li>
          <li className="flex justify-between">
            <div className="text-5xl">
              <FaCcPaypal />
            </div>
            <p className="mt-3 ml-3">Paypal</p>
          </li>
        </ul>
      </div>
      <h1>copyright by STU BOOKING</h1>
    </div>
  );
}

export default Footer;
