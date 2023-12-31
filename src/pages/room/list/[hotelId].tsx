import { getMyRooms } from "@/api/hotel";
import { getRoomsByHotelId, removeRoom } from "@/api/room";
import Layout from "@/components/layout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

type Props = {};

function Page({}: Props) {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const router = useRouter();
  const hotel_id =
    typeof router.query.hotelId === "string" ? router.query.hotelId : undefined;
  const query = useQuery({
    queryKey: ["get-my-rooms", hotel_id],
    queryFn: async () => await getRoomsByHotelId(hotel_id),
    keepPreviousData: true,
  });
  const deleteRoom = useMutation({
    mutationKey: ["room"],
    mutationFn: removeRoom,
    async onSuccess(data, variables, context) {
      toast.success("Xóa phòng thành công");
      queryClient.invalidateQueries({ queryKey: ["get-my-rooms"] });
    },
    async onError(error, variables, context) {
      toast.error(`${error}`);
    },
  });
  const handleDeleteRoom = (id: any) => {
    deleteRoom.mutate(id);
  };

  const handleOnClickItem = async (id: number) => {
    await router.push(`/room/detail/${id}`);
  };
  const handleOnClickEditRoom = async (id: number) => {
    await router.push(`/room/edit/${id}`);
  };
  const handleBtnPostClick = async () => {
    await router.push(`/room/post`);
  };

  return (
    <Layout>
      <div className="m-auto">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Danh sách phòng{" "}
                <span className="text-blue-500">
                  {query?.data?.hotel?.hotel_name}
                </span>
              </h2>
              <button
                onClick={handleBtnPostClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Thêm phòng
              </button>
            </div>

            {query.isSuccess ? (
              <div className="flex flex-col">
                <div className="overflow-x-auto">
                  <div className="flex justify-between py-3 pl-2">
                    <div className="relative max-w-xs">
                      <label htmlFor="hs-table-search" className="sr-only">
                        Search
                      </label>
                      <input
                        type="text"
                        name="hs-table-search"
                        id="hs-table-search"
                        className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        placeholder="Search..."
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg
                          className="h-3.5 w-3.5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button className="relative z-0 inline-flex text-sm rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1">
                          <span className="relative inline-flex items-center px-3 py-3 space-x-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md sm:py-2">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                              </svg>
                            </div>
                            <div className="hidden sm:block">Filters</div>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                              MÃ PHÒNG
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                              HÌNH
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                              SỐ PHÒNG
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                              SÚC CHỨA
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                            >
                              GIÁ
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                              LOẠI PHÒNG
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                              STATUS
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                              EDIT
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                            >
                              DELETE
                            </th>
                          </tr>
                        </thead>
                        {query?.data?.rooms?.[0]?.map((room: any) => (
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {room?.room_id}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                <img
                                  key={room?.room_id}
                                  onClick={async () =>
                                    await handleOnClickItem(room?.room_id)
                                  }
                                  src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
                                  alt={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
                                  className="h-[300px] w-[900px] object-cover object-center lg:h-full lg:w-full"
                                />
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {room?.room_name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {room?.capacity}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {!isNaN(room?.prize) && (
                                  <span className="text-sm font-medium text-gray-900">
                                    {Number(room?.prize).toLocaleString(
                                      "it-IT",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )}
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {room?.facilities}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {room?.status === "pending" ? (
                                  <p className="text-purple-700 font-semibold ">
                                    Đợi duyệt
                                  </p>
                                ) : (
                                  <></>
                                )}
                                {room?.status === "published" ? (
                                  <p className="text-green-700 font-semibold">
                                    Đang hiển thị
                                  </p>
                                ) : (
                                  <></>
                                )}
                                {room?.status === "concealed" ? (
                                  <p className="text-red-500 font-semibold">
                                    Bị ẩn
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </td>

                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="rounded-md bg-green-500 py-2 px-3 w-full text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  key={room?.room_id}
                                  onClick={async () =>
                                    await handleOnClickEditRoom(room?.room_id)
                                  }
                                >
                                  Sửa
                                </button>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="rounded-md bg-red-600 py-2 px-3 w-full text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                                  key={room?.room_id}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Bạn có chắc muôn xóa phòng ${room?.room_name} không?`
                                      )
                                    ) {
                                      handleDeleteRoom(room.room_id);
                                    }
                                  }}
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              //   <table className="table-fixed ">
              //   <thead>
              //     <tr className='justify-between'>
              //       <th>Mã phòng</th>
              //       <th>Sức chứa</th>
              //       <th>Giá</th>
              //     </tr>
              //   </thead>
              //   {query?.data?.rooms?.[0]?.map((room:any)=>(
              //   <tbody  key={room?.room_id}
              //          className="group justify-between"
              //          onClick={async () =>
              //            await handleOnClickItem(room?.room_id)
              //          }>
              //     <tr>
              //       <td>{room?.room_id}</td>
              //       <td>{room?.capacity}</td>
              //       <td>{room?.prize}</td>
              //     </tr>
              //   </tbody>
              //       ))}

              // </table>
              // <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8 cursor-pointer">
              //   {query?.data?.rooms?.[0]?.map((room: any) => (
              //     <div
              //       key={room?.room_id}
              //       className="group"
              //       onClick={async () =>
              //         await handleOnClickItem(room?.room_id)
              //       }
              //     >
              //       <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              //         <img
              //           src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
              //           alt={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
              //           className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              //         />
              //       </div>
              //       <div className="mt-4">
              //         <div>
              //           <h3 className="text-sm text-gray-700 font-bold">
              //             <p>
              //               Mã phòng{' '}
              //               <span className="text-blue-600">
              //                 {room?.room_id}
              //               </span>
              //             </p>
              //           </h3>
              //           <p className="mt-1 text-sm text-gray-500 min-w-[calc(1rem)]">
              //             Price:
              //             {!isNaN(room?.prize) &&
              //               Number(room?.prize).toLocaleString(
              //                 'en-US',
              //                 {
              //                   style: 'currency',
              //                   currency: 'VND',
              //                 }
              //               )}
              //           </p>
              //           <h3 className="text-sm text-gray-700 truncate">
              //             <p>
              //               <span aria-hidden="true" /> Xếp loại:
              //               {room?.facilities}
              //             </p>
              //           </h3>
              //         </div>
              //       </div>

              //     </div>

              //   ))}
              // </div>

              <React.Fragment />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;
