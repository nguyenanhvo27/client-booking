import { getMyHotels } from "@/api/hotel";
import Layout from "@/components/layout";
import withAuthentication from "@/lib/withAuthentication";
import { withRoleHotelier } from "@/lib/withAuthorization";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";

type Props = {};

const Page = (props: Props) => {
  const query = useQuery({
    queryKey: ["get-my-hotels"],
    queryFn: getMyHotels,
  });
  const router = useRouter();

  const handleOnClick = async (id: number) => {
    await router.push(`/room/list/${id}`);
  };

  const handleBtnPostClick = async () => {
    await router.push(`/hotel/post`);
  };
  const handleOnClickReservation = async (id: number) => {
    await router.push(`/reservation/${id}`);
  };
  return (
    <Layout>
      <div className="m-auto">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Khách Sạn Của Bạn
              </h2>
              <button
                onClick={handleBtnPostClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Post
              </button>
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
                        MÃ
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
                        TÊN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        TỈNH
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        ĐỊA CHỈ
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        SỬA
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        XÓA
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Đặt Phòng
                      </th>
                    </tr>
                  </thead>
                  {query?.data?.[0]?.map((hotel: any) => (
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {hotel?.hotel_id}
                        </td>
                        <td className=" h-[300px] w-[900px]px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          <img
                            src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${hotel?.imgPath}`}
                            alt={`${process.env.NEXT_PUBLIC_ENDPOINT}/${hotel?.imgPath}`}
                            className="h-[300px] w-[900px] object-cover object-center lg:h-full lg:w-full"
                            key={hotel?.hotel_id}
                            onClick={async () =>
                              await handleOnClick(hotel?.hotel_id)
                            }
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {hotel?.hotel_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {hotel?.province}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {hotel?.location}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-green-500 hover:text-green-700"
                            href="#"
                            //   key={hotel?.hotel_id}
                            // onClick={async () =>
                            //     await handleOnClickEdithotel(hotel?.hotel_id)
                            //   }
                          >
                            Sửa
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Xóa
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                            key={hotel?.hotel_id}
                            onClick={async () =>
                              await handleOnClickReservation(hotel?.hotel_id)
                            }
                          >
                            Lịch Đặt Phòng
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>

            {/* <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 cursor-pointer">
                {query?.data?.[0].map((hotel: any) => (
                  <div className="group truncate">
                    <div
                    key={hotel?.hotel_id}
                    onClick={async () =>
                      await handleOnClick(hotel?.hotel_id)
                    }
                     className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                         src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${hotel?.imgPath}`}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm text-gray-700 font-bold">
                        <a href={hotel?.href}>
                          <span aria-hidden="true" />
                          {hotel?.hotel_name}
                        </a>
                      </h3>
                      <p className="text-sm font-medium text-gray-900">
                        {hotel?.province}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 max-h-14 truncate">
                        {hotel?.location}
                      </p>
                    </div>
                  </div>
                  
                ))}
              </div>
              <React.Fragment />
           </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuthentication(withRoleHotelier(Page));
