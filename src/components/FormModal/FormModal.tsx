import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUpdateProductMutation } from "@/api/HomeApiSlice";
import Loader from "../HomeProducts/Loader";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "plese insert name more than 3 char"),
  //

  description: z.string().min(1, "plese insert an descripiton"),
  category: z.string().min(1, "plese insert an category"),

  image: z.string().min(1, "plese insert an image"),
});

type FormModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  formData: any;
  setProducts: React.Dispatch<any>;
  products: [];
};

const FormModal = (props: FormModalProps) => {
  const [formData, setFormData] = useState<any>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setFormData(props?.formData);
  }, [props.formData]);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(value);
    console.log(formData);
  };
  console.log(props.formData);
  const updateProductHandler = async (id: any) => {
    const result = formSchema.safeParse(formData);
    // phoneSchema.safeParse(phone);

    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);
      // @ts-ignore
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }
    const data = await updateProduct(formData);
    console.log(data);
    props.setProducts(
      props.products.map((product: any) => {
        //@ts-ignore
        if (product.id === data?.data?.id) {
          //@ts-ignore
          return data?.data;
        } else {
          return product;
        }
      })
    );
    props.setModalOpen(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="mb-5">
        <Transition appear show={props.modalOpen} as={Fragment}>
          <Dialog
            as="div"
            open={props.modalOpen}
            onClose={() => props.setModalOpen(false)}
          >
            <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    as="div"
                    className=" panel border-0 p-5 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark bg-white"
                  >
                    <h5 className="font-bold text-lg">edit </h5>
                    <div className="p-5">
                      <form
                        className="space-y-5"
                        //    onSubmit={handleSubmit}
                      >
                        <label className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData?.title}
                            onChange={handleChange}
                            placeholder="title"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          />

                          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            title
                          </span>
                        </label>
                        {errors.title && (
                          <p className="text-[red] font-normal">
                            {errors.title[0]}
                          </p>
                        )}
                        <label className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                          <input
                            type="text"
                            id="price"
                            name="price"
                            onChange={handleChange}
                            placeholder="price"
                            value={formData?.price}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          />

                          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            price
                          </span>
                        </label>

                        <label className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                          <input
                            type="text"
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={formData?.description}
                            placeholder="description"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          />

                          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            description
                          </span>
                        </label>
                        {errors.description && (
                          <p className="text-[red] font-normal">
                            {errors.description[0]}
                          </p>
                        )}
                        <label className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                          <input
                            type="text"
                            id="category"
                            placeholder="category"
                            onChange={handleChange}
                            name="category"
                            value={formData?.category}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          />

                          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            category
                          </span>
                        </label>
                        {errors.category && (
                          <p className="text-[red] font-normal">
                            {errors.category[0]}
                          </p>
                        )}
                        <label className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                          <input
                            type="text"
                            id="image"
                            placeholder="image"
                            onChange={handleChange}
                            name="image"
                            value={formData?.image}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          />

                          <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            image
                          </span>
                        </label>
                        {errors.image && (
                          <p className="text-[red] font-normal">
                            {errors.image[0]}
                          </p>
                        )}
                        <div className="flex justify-end items-center mt-8 gap-5">
                          <button
                            type="button"
                            className="btn btn-outline-danger text-red-400"
                            onClick={() => props.setModalOpen(false)}
                          >
                            cancel
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateProductHandler(props?.formData?.id)
                            }
                            // disabled={isLoadingEdit}
                            className="btn btn-primary ltr:ml-4 rtl:mr-4 text-blue"
                          >
                            save
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default FormModal;
