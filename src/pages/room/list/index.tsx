import { getRooms } from "@/api/room";
import Layout from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BsFillEyeFill } from "react-icons/bs";
import React from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Pagination from "@/components/pagination";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
    ],
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const params = { pageSize: 10, pageNumber: 1, ...router.query };
  const query = useQuery({
    queryKey: ["get-rooms-filter", params],
    queryFn: async () => await getRooms(params),
    enabled: Object.keys(params).length > 0,
  });

  const handleOnClick = async (id: number) => {
    await router.push(`/room/detail/${id}`);
  };
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);

  return (
    <Layout>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={React.Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={React.Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={React.Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="px-2 py-3 font-medium text-gray-900"
                      >
                        {subCategories.map((category) => (
                          <li key={category.name}>
                            <a href={category.href} className="block px-2 py-3">
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Phòng
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Your content */}
                  {/* <div className="bg-white">
                 
                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                      {query.isSuccess ? (
                        
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-1 xl:gap-x-8 cursor-pointer">
                          {query?.data?.[0]?.map((room: any) => (
                            <div
                              key={room?.room_id}
                              className="group"
                              onClick={async () =>
                                await handleOnClick(room?.room_id)
                              }
                            >
                              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
                                  alt={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
                                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                              </div>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                  <span className="inset-0 text-2xl font-medium text-gray-900">
                                  Khách sạn: {' '}{room?.__hotel__?.hotel_name}
                                  </span><br/>
                                  <span className="inset-0 text-2xl font-medium text-gray-900">
                                  Địa chỉ: {' '}{room?.__hotel__?.location}
                                  </span>
                                  <p>Tên phòng khách sạn: {room?.room_name}</p>
                                  <p>Mã phòng: {room?.room_id}</p>
                                    <p className="inset-0 text-sm font-medium text-gray-900">
                                     Sức chứa:{' '}
                                      <span>{room?.capacity}</span> {' '}
                                      người
                                    </p>
                                  </h3>
                                </div>
                                <div className="min-w-[calc(5rem)]">
                                  <p>
                                    Giá:{' '}
                                    {!isNaN(room?.prize) && (
                                      <span className="text-sm font-medium text-gray-900">
                                        {Number(
                                          room?.prize
                                        ).toLocaleString('it-IT', {
                                          style: 'currency',
                                          currency: 'VND',
                                        })}
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 truncate">
                                Loại phòng: {room?.facilities}
                              </p>
                              <p className="mt-1 text-sm text-gray-500 truncate">
                                Mô tả: {room?.__roomType__?.other_facilities}
                              </p>
                            </div>
                            
                          ))}
                          
                        </div>
                      ) : (
                        <React.Fragment />
                      )}
                      <div className="mt-10 flex justify-center items-center">
                        <Pagination
                          currentPage={params.pageNumber}
                          pageSize={params.pageSize}
                          totalItems={query?.data?.[1]}
                        />
                      </div>
                    </div>
                  </div> */}
                  {query.isSuccess ? (
                    <div className=" flex grid grid-cols-1 ">
                      {/* md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 */}
                      {query?.data?.[0]?.map((room: any) => (
                        <div className="cursor-pointer flex rounded-xl bg-white p-3 drop-shadow-2xl hover:shadow-xl my-2">
                          <div className="relative flex items-end overflow-hidden rounded-xl">
                            <img
                              className="h-[250px] w-[500px]"
                              src={`${process.env.NEXT_PUBLIC_ENDPOINT}/${room?.imgPath}`}
                              alt="wallpaper"
                            />

                            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>

                              <span className="ml-1 text-sm text-slate-400">
                                {room?.__roomType__?.rating}
                              </span>
                            </div>
                          </div>

                          <div className="mt-1 p-2 ml-6">
                            <h2 className="flex text-slate-700 font-semibold">
                              Khách sạn {":   "}
                              <p className="text-blue-600 text-xl font-bold">
                                {room?.__hotel__?.hotel_name}
                              </p>
                            </h2>
                            <p className="mt-1 text-sm text-black font-medium">
                              Vị Trí: {room?.__hotel__?.province}
                            </p>
                            <p className="mt-1 text-sm text-black font-medium">
                              Địa chỉ: {room?.__hotel__?.location}
                            </p>
                            <p className=" flex mt-1 text-sm text-black font-medium">
                              <p>Sức chứa: </p>
                              <p className="text-red-400">
                                {"  "} {room?.capacity}
                              </p>
                            </p>
                            <p className=" flex mt-1 text-sm text-black font-medium">
                              <p>Tên Phòng: </p>
                              <p className="text-red-400">
                                {"  "} {room?.room_name}
                              </p>
                            </p>
                            <p className=" flex mt-1 text-sm text-black font-medium">
                              <p>Loại phòng: </p>
                              <p className="text-red-400">
                                {"  "} {room?.facilities}
                              </p>
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                              <p>
                                <span className="text-lg font-bold text-orange-500">
                                  {Number(room?.prize).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                                <span className="text-sm text-slate-400">
                                  /Ngày
                                </span>
                              </p>

                              <div className="group text-3xl text-green-900 inline-flex rounded-xl  p-2 hover:bg-orange-200">
                                <BsFillEyeFill
                                  key={room?.room_id}
                                  onClick={async () =>
                                    await handleOnClick(room?.room_id)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <React.Fragment />
                  )}
                  <div className="mt-10 flex justify-center items-center">
                    <Pagination
                      currentPage={params.pageNumber}
                      pageSize={params.pageSize}
                      totalItems={query?.data?.[1]}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
