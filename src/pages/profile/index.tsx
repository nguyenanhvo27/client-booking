import React, { useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "@/api/auth";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateProfile } from "@/api/user";
import SpinnerBasic from "@/components/spinner-basic";
import Spinner from "@/components/spinner";
import { useImgPathStore } from "@/zustand";

type Props = {};
type Inputs = {
  first_name: string;
  imgPath: string;
  last_name: string;
  location: string;
  phone_number: string;
  email: string;
  file: FileList;
};
function Page({}: Props) {
  const queryClient = useQueryClient();
  const { back } = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const setImgPath = useImgPathStore((state: any) => state.setImgPath);

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const mutation = useMutation({
    mutationKey: ["profile"],
    mutationFn: updateProfile,
    async onSuccess(data, variables, context) {
      setImgPath(data?.imgPath);
      await queryClient.invalidateQueries(["profile"]);
      toast.success("Update successful!");
    },
    async onError(error, variables, context) {
      toast.error("Update failed!");
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: query.isLoading ? {} : query.data,
  });

  const [file, setFile] = React.useState<any>(null);
  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (query.data) {
      setValue("first_name", query.data?.first_name);
      setValue("last_name", query.data?.last_name);
      setValue("phone_number", query.data?.phone_number);
      setValue("location", query.data?.location);
    }
  }, []);
  console.log(query.data);

  return (
    <Layout>
      {query.isLoading ? (
        <Spinner />
      ) : (
        <form
          className="lg:max-w-6xl mx-auto mt-20 border px-14 py-20 rounded-3xl shadow bg-gray-50"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Thông tin cá nhân
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thông tin sẽ được hiển thị công khai.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        {...register("email")}
                        id="email"
                        name="email"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ảnh đại diện
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {query.data?.imgPath ? (
                      <div className="h-12 w-12">
                        <img
                          src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${query.data?.imgPath}`}
                          alt="avatar"
                          className="h-full w-full rounded-full object-cover object-center"
                        />
                      </div>
                    ) : (
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <input
                      type="file"
                      id="file"
                      required
                      {...register("file", {
                        validate: {
                          accept: (value) =>
                            ["image/png", "image/jpeg", "image/jpg"].includes(
                              value?.[0]?.type
                            ),
                          maxSize: (value) => value?.[0]?.size <= 3000000,
                        },
                      })}
                    />
                  </div>
                  {errors.file && (
                    <p className="text-red-500">Choose File Error</p>
                  )}
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Thông tin người dùng
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Sử dụng địa chỉ thường trú.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Họ
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("first_name")}
                      name="first_name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tên
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("last_name")}
                      name="last_name"
                      autoComplete="family-name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Số điện thoại
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("phone_number")}
                      name="phone_number"
                      id="phone_number"
                      autoComplete="family-name"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("location")}
                      name="location"
                      id="location"
                      autoComplete="location"
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => back()}
            >
              Cancel
            </button>
            {mutation.isLoading ? (
              <SpinnerBasic />
            ) : (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      )}
    </Layout>
  );
}

export default Page;
