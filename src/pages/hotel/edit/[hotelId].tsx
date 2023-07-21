import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { optionProvince } from "@/constants/option-province";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateHotel, getMyHotels } from "@/api/hotel";
import { toast } from "react-toastify";
import Select from "react-select";

type Inputs = {
  hotel_name: string;
  location: string;
  province: string;
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
  const hotel_id =
    typeof router.query.hotelId === "string" ? router.query.hotelId : undefined;
  const query = useQuery({
    queryKey: ["get-my-rooms", hotel_id],
    queryFn: async () => await getMyHotels(hotel_id),
  });

  const mutation = useMutation({
    mutationKey: ["update-room-room_type"],
    mutationFn: async (data: any) => await updateHotel(data, hotel_id),
    onSuccess(data, variables, context) {
      toast.success("Sửa thành công");
      back();
    },
    onError(error, variables, context) {
      toast.error(`Sửa thất bại ${error}`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    mutation.mutate(data);
    console.log(data, "input");
  };
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (query.data) {
      setValue("hotel_name", query.data?.[0]?.[0]?.hotel_name);
      setValue("province", query.data?.[0]?.[0]?.province);
      setValue("location", query.data?.[0]?.[0]?.location);
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center mt-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-5xl text-center font-semibold leading-7 text-gray-900 pb-9">
                Sửa Khách sạn
              </h2>
              <div className="ml-36 text-center justify-center">
                <span className=" text-xl font-bold"> khách sạn:</span>{" "}
                <input
                  {...register("hotel_name")}
                  type="text"
                  name="hotel_name"
                  className=" text-blue-600 font-bold text-2xl"
                />
              </div>

              <p className="mt-1 text-sm text-center leading-6 text-gray-600">
                Thông tin bạn chia sẻ đây sẽ được đăng lên website. <br />
                Hãy cẩn thận với thông tin bạn chia sẻ và đảm bảo rằng nó đúng!
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                <div className="sm:col-span-12">
                  <label
                    htmlFor="hotel_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên khách sạn:
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        {...register("hotel_name")}
                        type="text"
                        name="hotel_name"
                        id="hotel_name"
                        autoComplete="hotel_name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-12">
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tỉnh Thành
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm sm:max-w-md">
                      <Controller
                        name="province"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            className="w-full"
                            {...register("province")}
                            name="province"
                            options={optionProvince}
                            placeholder="Where ?"
                            onChange={(val) => val && onChange(val.value)}
                          />
                        )}
                        rules={{ required: true }}
                      />
                      {errors.province && (
                        <span className="text-red-600">
                          Chọn tỉnh thành hợp lệ
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Địa chỉ
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("location")}
                      id="location"
                      rows={3}
                      className="block pl-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      required={true}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Nhập địa chỉ cụ thể để người dùng có thể tìm
                  </p>
                </div>

                <div className="col-span-full">
                  <input
                    type="file"
                    {...register("file", {
                      required: true,
                      validate: {
                        accept: (value) =>
                          ["image/png", "image/jpeg", "image/jpg"].includes(
                            value?.[0]?.type
                          ),
                        maxSize: (value) => value?.[0]?.size <= 3000000,
                      },
                    })}
                  />
                  {errors.file && <p>{errors.file.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={goBack}
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
      </div>
    </Layout>
  );
}

export default Page;
