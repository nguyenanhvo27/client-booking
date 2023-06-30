import { getRoomId } from "@/api/room";
import Layout from "@/components/layout";
import Spinner from "@/components/spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";

type Inputs = {
  hotel_id: number;
  room_name: string;
  capacity: number;
  prize: number;
  facilities: string;
  wifi: boolean;
  AC: boolean;
  parking: boolean;
  pool: boolean;
  heater: boolean;
  other_facilities: string;
  file: FileList;
};
type Props = {};

function Page({}: Props) {
  const [options, setOptions] = React.useState<any[]>([]);
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const room_id =
    typeof router.query.roomId === "string" ? router.query.roomId : undefined;
  const query = useQuery({
    queryKey: ["get-my-rooms", room_id],
    queryFn: async () => await getRoomId(room_id),
  });

  return (
    <Layout>
      <div className="flex justify-center items-center mt-10">
        {query.isLoading ? (
          <Spinner />
        ) : (
          <form
            className="min-w-[calc(50%)]"
            // onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <label className="block text-5xl font-medium leading-6 text-gray-900 my-11">
              Sửa Phòng
            </label>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <label className="block text-3xl font-medium leading-6 text-gray-900 mb-5">
                    Mô Tả Phòng
                  </label>
                  <div className="col-span-full">
                    <label
                      htmlFor="room_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tên phòng
                    </label>
                    <div className="my-3">
                      <textarea
                        {...register("room_name")}
                        name="room_name"
                        value={query?.data?.room_name}
                        className="pl-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="capacity"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Số Lượng người chứa
                    </label>
                    <div className="my-3">
                      <input
                        type="number"
                        {...register("capacity", {
                          min: 1,
                          max: 10,
                        })}
                        value={query?.data?.capacity}
                        id="capacity"
                        placeholder="Min 1 Max 10"
                        name="capacity"
                        className="pl-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      />
                      {errors.capacity && (
                        <span className="text-red-600">
                          This field is Invalid
                        </span>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="prize"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Giá 1 ngày
                      </label>
                      <div className="my-3 flex items-center p-1 pl-2 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 shadow-sm ">
                        <p className="border-r-2 px-2">$</p>
                        <input
                          type="number"
                          {...register("prize", {
                            required: true,
                            min: 1,
                            max: 10000000,
                          })}
                          value={query?.data?.prize}
                          id="prize"
                          placeholder="Min 1 & Max 100.000.000"
                          name="prize"
                          className="pl-4 block w-full border-none ring-0 outline-none text-gray-900 sm:py-1.5 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.prize && (
                        <span className="text-red-600">
                          This field is Invalid
                        </span>
                      )}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="facilities"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Xếp loại cơ sở
                      </label>
                      <div className="my-3">
                        <textarea
                          {...register("facilities")}
                          id="facilities"
                          name="facilities"
                          className="pl-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                          defaultValue={""}
                          value={query?.data?.facilities}
                        />
                      </div>
                    </div>

                    <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                      Cơ sở vật chất
                    </label>
                    <div className="col-span-full">
                      <div className="my-3">
                        <div className="flex items-center">
                          <Controller
                            name="wifi"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                {...field}
                                id="wifi"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            )}
                          />
                          <label
                            htmlFor="wifi"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Wifi
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Controller
                            name="AC"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                {...field}
                                id="AC"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            )}
                          />
                          <label
                            htmlFor="ac"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Máy lạnh
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Controller
                            name="heater"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                {...field}
                                id="heater"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            )}
                          />
                          <label
                            htmlFor="headter"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Máy sưởi
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Controller
                            name="parking"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                {...field}
                                id="parking"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            )}
                          />
                          <label
                            htmlFor="parking"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Bãi đỗ xe
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Controller
                            name="pool"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                {...field}
                                id="pool"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            )}
                          />
                          <label
                            htmlFor="pool"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Bể bơi
                          </label>
                        </div>

                        <div className="col-span-full mt-2">
                          <label
                            htmlFor="other_facilities"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cơ sở vật chất khác
                          </label>
                          <div className="my-3">
                            <textarea
                              {...register("other_facilities")}
                              id="other_facilities"
                              className="pl-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                              defaultValue={""}
                              value={
                                query?.data?.__roomType__?.other_facilities
                              }
                            />
                          </div>
                        </div>

                        <div className="col-span-full ">
                          <h1 className="text-md block font-medium leading-6 text-gray-900 my-4">
                            Hình ảnh
                          </h1>
                          <input
                            type="file"
                            required
                            {...register("file", {
                              validate: {
                                accept: (value) =>
                                  [
                                    "image/png",
                                    "image/jpeg",
                                    "image/jpg",
                                  ].includes(value?.[0]?.type),
                                maxSize: (value) => value?.[0]?.size <= 3000000,
                              },
                            })}
                          />

                          {errors.file && <p>{errors.file.message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default Page;
