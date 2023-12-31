import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { success } from "@/api/hotelierTranaction";
import { toast } from "react-toastify";
import _ from "lodash";
import axios from "axios";
import { log } from "console";

type Props = {
  value: {
    amount: string;
    hotelier_transaction_id: number;
  };
  status: string;
};

function PaymentModalHotelier({ value, status }: Props) {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);

  const hotelier_transaction_id = value.hotelier_transaction_id;
  const mutation = useMutation({
    mutationKey: ["hotelier-transaction"],
    mutationFn: success,
    async onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["get-my-rooms"] });
      toast.success("Cập nhật trạng thái thành công");
    },
  });
  return (
    <React.Fragment>
      {status === "unpaid" ? (
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setOpen(true)}
        >
          Thanh toán
        </button>
      ) : (
        <button className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Đã Thanh Toán
        </button>
      )}

      <Transition.Root show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          //   initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 w-full sm:ml-4 sm:mt-0 sm:text-left">
                        <PayPalScriptProvider
                          options={{
                            "client-id":
                              "AVoOXZYc6taT66Lhh-ES6nU0sUrozudRrv9CGBU0Z4Cx07NlAtcG768wz5lC676BVRbhNL8wFBcKZ9ZK",
                          }}
                        >
                          <PayPalButtons
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: value.amount,
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions: any) => {
                              return actions.order
                                .capture()
                                .then((details: any) => {
                                  mutation.mutate(
                                    String(value.hotelier_transaction_id)
                                  );
                                  const name = details.payer.name.given_name;
                                  toast.success(
                                    `Thanh toán thành công bởi ${name}`
                                  );
                                  setOpen(false);
                                  //  window.location.reload();
                                });
                            }}
                          />
                        </PayPalScriptProvider>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );
}

export default PaymentModalHotelier;
