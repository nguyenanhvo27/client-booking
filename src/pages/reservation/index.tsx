import { getReservation } from "@/api/reservation";
import Layout from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PaymentModal from "@/components/payment";
import CancelPayment from "@/components/cancel-payment";
import Pagination from "@/components/pagination";
import { useRouter } from "next/router";
import CommentModal from "@/components/comment-modal";

type Props = {};

function Page({}: Props) {
  const currentDateTime = new Date();
  const vietnamTime = new Date(
    currentDateTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const formattedTime = vietnamTime.toISOString();
  console.log(formattedTime, "ios");
  const router = useRouter();
  const params = { pageSize: 10, pageNumber: 1, ...router.query };

  const query = useQuery({
    queryKey: ["reservation", params],
    queryFn: async () => await getReservation(params),
    enabled: Object.keys(params).length > 0,
    keepPreviousData: true,
  });
  console.log(query.data);

  return (
    <Layout>
      <div>
        <div className="flex justify-center items-center">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 w-full h-full mt-20 ml-10 max-w-full">
            <h1 className="text-center font-bold text-3xl py-10">
              DANH SÁCH ĐẶT PHÒNG
            </h1>
            {query?.data?.[0]?.map((element: any) => (
              <li className="pb-3 sm:pb-4" key={element?.reservation_id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${element?.__hotel__?.imgPath}`}
                      alt={element?.__hotel__?.imgPath}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Tên khách sạn: {element?.__hotel__?.hotel_name}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Địa chỉ: {element?.__hotel__?.location}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Tỉnh: {element?.__hotel__?.province}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Số người ở: {element?.guest_list}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Check In:{" "}
                      {element?.check_in &&
                        new Date(element?.check_in).toLocaleDateString()}{" "}
                      {element?.check_in &&
                        new Date(element?.check_in).toLocaleTimeString()}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Checkout:{" "}
                      {element?.checkout &&
                        new Date(element?.checkout).toLocaleDateString()}{" "}
                      {element?.checkout &&
                        new Date(element?.checkout).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Ngày đặt:{" "}
                      {element?.created_at &&
                        new Date(element?.created_at).toLocaleDateString()}{" "}
                      {element?.created_at &&
                        new Date(element?.created_at).toLocaleTimeString()}
                    </p>

                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Tên phòng: {element?.__room__.room_name}
                    </p>
                  </div>

                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {!isNaN(element?.__transactions__?.[0]?.amount) &&
                      Number(
                        element?.__transactions__?.[0]?.amount
                      ).toLocaleString("IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {element.status === "confirmed" ? (
                      <PaymentModal
                        value={{
                          amount: Number(
                            element?.__transactions__?.[0]?.amount / 23000
                          ).toFixed(2),
                          transaction_id:
                            element?.__transactions__?.[0]?.transaction_id,
                        }}
                        status={element?.__transactions__?.[0]?.status}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    {element?.status === "completed" ? (
                      <CommentModal
                        room_id={element?.note}
                        reservation_id={element?.reservation_id}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <CancelPayment
                      reservation_id={element?.reservation_id}
                      status={element?.status}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <Pagination
            currentPage={params.pageNumber}
            pageSize={params.pageSize}
            totalItems={query?.data?.[1]}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Page;
