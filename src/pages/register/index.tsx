import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { registerAPI } from '@/api/auth';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Hotel from '@/assets/images/hotel.jpg';
import Link from 'next/link';
import SpinnerBasic from '@/components/spinner-basic';

type Inputs = {
  email: string;
  password: string;
  location: string;
  phone_number: string;
  first_name: string;
  last_name: string;
};
type Props = {};

function Page({}: Props) {
  const { query } = useRouter();

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: registerAPI,
    async onSuccess(data, variables, context) {
      toast.success(`Register success`);
      await signIn();
    },
    onError(error, variables, context) {
      toast.error(`Register error: ${error}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const newData = {
      ...data,
      role: typeof query.role === 'string' ? query.role : undefined,
    };

    mutation.mutate(newData);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href={'/'}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image className="w-8 h-8 mr-2" src={Hotel} alt="logo" />
          Register
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            {/*  "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                {/* register your input into the hook by invoking the "register" function */}

                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required={true}
                />
                {errors.email && (
                  <p className="text-red-500">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                {errors.password && (
                  <p className="text-red-500">
                    This field is required
                  </p>
                )}{' '}
              </div>
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>

                <input
                  {...register('first_name')}
                  type="first_name"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                {errors.first_name && (
                  <p className="text-red-500">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  {...register('last_name')}
                  type="last_name"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                {errors.last_name && (
                  <p className="text-red-500">
                    This field is required
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>

                <input
                  {...register('phone_number', {
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: 'Invalid phone number',
                    },
                  })}
                  placeholder="Accept: 0388888888, 0588888888, 0788888888, 0888888888, 098888888, 8488888888"
                  type="phone_number"
                  id="phone_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                {errors.phone_number && (
                  <p className="text-red-500">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <input
                  {...register('location')}
                  type="location"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
                {errors.location && (
                  <p className="text-red-500">
                    This field is required
                  </p>
                )}
              </div>
              {mutation.isLoading ? (
                <SpinnerBasic />
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              )}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
                <span
                  onClick={() => signIn()}
                  className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </span>
              </p>
            </form>
            <a href='/'>
                <button
                  type="submit"
                  className=" text-white bg-yellow-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Cancel
                </button>
                </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
