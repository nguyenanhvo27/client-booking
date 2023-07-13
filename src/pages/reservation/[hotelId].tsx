// export default ReservationHotelier;

import {
  getReservationById,
  accept,
  cancelReservation,
  remove,
  success,
} from "../../api/reservation";
import Layout from "@/components/layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Pagination from "@/components/pagination";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type Props = {
  reservation_id: number;
};

function Page({ reservation_id }: Props) {
  const currentDateTime = new Date();
  const vietnamTime = new Date(
    currentDateTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const formattedTime = vietnamTime.toISOString();
  console.log(formattedTime, "hotelier");
  const router = useRouter();
  const params = { pageSize: 10, pageNumber: 1, ...router.query };
  const hotel_id =
    typeof router.query.hotelId === "string" ? router.query.hotelId : undefined;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["reservation", hotel_id],
    queryFn: async () => await getReservationById(hotel_id),
  });

  const acceptReservation = useMutation({
    mutationKey: ["reservation"],
    mutationFn: accept,
    onSuccess(data, variables, context) {
      toast.success("duyệt lịch thành công");
      queryClient.invalidateQueries(["reservation"]);
    },
    onError(error, variables, context) {
      toast.error("Update fail");
    },
  });
  const mutation = useMutation({
    mutationKey: ["reservation"],
    mutationFn: cancelReservation,
    onSuccess(data, variables, context) {
      toast.success("Hủy lịch thành công");
      queryClient.invalidateQueries(["reservation"]);
    },
    onError(error, variables, context) {
      toast.error("Update fail");
    },
  });
  const mutationRemove = useMutation({
    mutationKey: ["reservation"],
    mutationFn: remove,
    onSuccess(data, variables, context) {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries(["reservation"]);
    },
    onError(error, variables, context) {
      toast.error("Update fail");
    },
  });
  const reservationSuccess = useMutation({
    mutationKey: ["reservation"],
    mutationFn: success,
    onSuccess(data, variables, context) {
      toast.success("Nhận phòng thành công");
      queryClient.invalidateQueries(["reservation"]);
    },
    onError(error, variables, context) {
      toast.error("Nhận phòng không thành công");
    },
  });

  const handleCancel = (reservation_id: any) => {
    mutation.mutate(reservation_id);
  };

  const handleAccept = (reservation_id: any) => {
    acceptReservation.mutate(reservation_id);
  };

  const handleRemove = (reservation_id: any) => {
    mutationRemove.mutate(reservation_id);
  };
  const handleSuccess = (reservation_id: any) => {
    reservationSuccess.mutate(reservation_id);
  };

  return (
    <Layout>
      <div>
        <div className="pt-24 text-center  ">
          <h1 className="font-bold text-2xl">
            Danh Sách đặt phòng của khách sạn {"  "}{" "}
          </h1>
          <p className="font-bold text-2xl text-blue-800">
            {query?.data?.hotel?.hotel_name}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 w-full h-full mt-20 max-w-7xl">
            {query?.data?.reservation?.[0]?.map((reservation: any) => (
              <li className="pb-3 sm:pb-4">
                <div className="flex-row flex items-center space-x-4">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${reservation?.__room__?.imgPath}`}
                      alt={reservation?.__room__?.room_name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Ngày đặt:{" "}
                      {reservation?.created_at &&
                        new Date(
                          reservation?.created_at
                        ).toLocaleDateString()}{" "}
                      {reservation?.created_at &&
                        new Date(reservation?.created_at).toLocaleTimeString()}
                    </p>

                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Check In:{" "}
                      {reservation?.check_in &&
                        new Date(
                          reservation?.check_in
                        ).toLocaleDateString()}{" "}
                      {reservation?.check_in &&
                        new Date(reservation?.check_in).toLocaleTimeString()}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Checkout:{" "}
                      {reservation?.checkout &&
                        new Date(
                          reservation?.checkout
                        ).toLocaleDateString()}{" "}
                      {reservation?.checkout &&
                        new Date(reservation?.checkout).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Số người ở: {reservation?.guest_list}
                    </p>

                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Phòng số: {reservation?.__room__?.room_name}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Số tiền:{" "}
                      {!isNaN(reservation?.__transactions__?.[0]?.amount) &&
                        Number(
                          reservation?.__transactions__?.[0]?.amount
                        ).toLocaleString("IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Tên người đặt: {reservation?.__user__?.first_name}{" "}
                      {reservation?.__user__?.last_name}
                    </p>

                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Gmail: {reservation?.__user__?.email}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Số điện thoại: {reservation?.__user__?.phone_number}
                    </p>
                  </div>
                  <div>
                    {/* ////// status pending */}
                    {reservation?.status === "pending" ? (
                      <div className="flex">
                        <div className="flex">
                          <div className="flex">
                            <span className="text-base font-medium">
                              Trạng thái đặt phòng:{" "}
                            </span>
                            <p className="text-red-700 font-bold text-base">
                              Đợi duyệt
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex ml-10"
                          key={reservation?.reservation_id}
                        >
                          <button
                            className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-800"
                            onClick={() => {
                              if (window.confirm("Duyệt lịch đặt phòng này?")) {
                                handleAccept(reservation?.reservation_id);
                              }
                            }}
                          >
                            Duyệt
                          </button>
                          <button
                            className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                            onClick={() => {
                              if (window.confirm("Hủy lịch đặt phòng này?")) {
                                handleCancel(reservation?.reservation_id);
                              }
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* /////// status :  confirmed */}
                    {reservation?.status === "confirmed" ? (
                      <div className="flex">
                        <div className="flex">
                          <div>
                            <div className="flex">
                              <span className="text-base font-medium">
                                Trạng thái đặt phòng:{" "}
                              </span>
                              <p className="text-red-700 font-bold text-base">
                                Đã duyệt
                              </p>
                            </div>
                            <div className="flex">
                              {reservation?.__transactions__?.[0]?.status ===
                              "completed" ? (
                                <div>
                                  <span className="text-base font-medium">
                                    Trạng thái thanh toán:{" "}
                                  </span>
                                  <p className="text-red-700 font-bold text-base">
                                    đã thanh toán
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                              {reservation?.__transactions__?.[0]?.status ===
                              "unpaid" ? (
                                <div>
                                  <span className="text-base font-medium">
                                    Trạng thái thanh toán:{" "}
                                  </span>
                                  <p className="text-red-700 font-bold text-base">
                                    chưa thanh toán
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex ml-10">
                          <button
                            className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-green-200 rounded-lg focus:shadow-outline"
                            onClick={() => {
                              if (
                                window.confirm("Bạn đã duyệt lịch đặt này! ")
                              ) {
                              }
                            }}
                          >
                            Duyệt
                          </button>
                          <button
                            className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-red-200 rounded-lg focus:shadow-outline "
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Bạn không thể hủy khi đã duyệt lịch đặt! "
                                )
                              ) {
                              }
                            }}
                          >
                            Hủy
                          </button>
                          {formattedTime >= reservation?.check_in ? (
                            <button
                              className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline "
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Mời khách nhận lịch đặt phòng?"
                                  )
                                ) {
                                  handleSuccess(reservation?.reservation_id);
                                }
                              }}
                            >
                              Đã nhận phòng
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    {/* /////// status === cancel */}
                    {reservation?.status === "cancelled" ? (
                      <div className="flex">
                        <div className="flex">
                          <div>
                            <div className="flex">
                              <span className="text-base font-medium">
                                Trạng thái đặt phòng:{" "}
                              </span>
                              <p className="text-red-700 font-bold text-base">
                                Đã hủy
                              </p>
                            </div>
                            <div className="flex">
                              {reservation?.__transactions__?.[0]?.status ===
                              "unpaid" ? (
                                <div>
                                  <span className="text-base font-medium">
                                    Trạng thái thanh toán:{" "}
                                  </span>
                                  <p className="text-red-700 font-bold text-base">
                                    Chưa thanh toán
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                              {reservation?.__transactions__?.[0]?.status ===
                              "paid" ? (
                                <div>
                                  <span className="text-base font-medium">
                                    Trạng thái thanh toán:{" "}
                                  </span>
                                  <p className="text-red-700 font-bold text-base">
                                    Đã thanh toán
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex ml-10">
                          <button
                            className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-red-200 rounded-lg focus:shadow-outline "
                            onClick={() => {
                              if (window.confirm("Xóa lịch đặt phòng này?")) {
                                handleRemove(reservation?.reservation_id);
                              }
                            }}
                          >
                            {" "}
                            Xóa
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    {/* /////// completed */}
                    {reservation?.status === "completed" ? (
                      <div className="flex">
                        <div className="flex">
                          <div>
                            <div className="flex">
                              <span className="text-base font-medium">
                                Trạng thái đặt phòng:{" "}
                              </span>
                              <p className="text-green-700 font-bold text-base">
                                Đã nhận phòng
                              </p>
                            </div>
                            <div className="flex">
                              {reservation?.__transactions__?.[0]?.status ===
                              "completed" ? (
                                <div>
                                  <span className="text-base font-medium">
                                    Trạng thái thanh toán:{" "}
                                  </span>
                                  <p className="text-green-700 font-bold text-base">
                                    Thanh toán thành công
                                  </p>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex ml-10">
                          <button className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline ">
                            Thành công
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
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
