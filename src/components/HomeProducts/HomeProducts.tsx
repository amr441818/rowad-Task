"use client";
import { fetchProductsServerAction } from "@/utils/actions";
import { Dialog, Transition } from "@headlessui/react";
import { Rating } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/api/HomeApiSlice";
import Loader from "./Loader";
import FormModal from "../FormModal/FormModal";

const HomeProducts = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
  });
  const [products, setProducts] = useState<any>([]);
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading: deletationIsLoading }] =
    useDeleteProductMutation();

  useEffect(() => {
    //@ts-ignore
    setProducts(data);
  }, [isLoading]);

  const editHandler = (product: any) => {
    setFormData(product);
    setModalOpen(true);
  };
  const deleteHandler = async (id: number) => {
    const data = await deleteProduct(id);

    setProducts(products?.filter((product: any) => product?.id !== id));
    console.log(data);
  };
  {
    if (isLoading || deletationIsLoading) {
      return <Loader />;
    }
  }
  return (
    <>
      <FormModal
        formData={formData}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        setProducts={setProducts}
        products={products}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mx-[67px] ">
        {products?.map((product: any) => (
          <>
            <Link
              href="#"
              className="block rounded-lg p-4 shadow-sm shadow-indigo-100 min-h-[290px] max-h-[350px]"
            >
              <Image alt="" width={100} height={56} src={product?.image} />

              <div className="mt-2">
                <dl>
                  <div>
                    <dt className="sr-only">Price</dt>

                    <dd className="text-sm text-gray-500">${product?.price}</dd>
                  </div>

                  <div>
                    <dt className="sr-only">discrepation</dt>

                    <dd className="font-medium">{product?.title}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-between">
                <Rating defaultValue={product?.rating?.rate} />
                <span> {product?.rating?.count} rate</span>
              </div>
              <div className="flex gap-4 items-center justify-end pt-3">
                <button
                  type="button"
                  onClick={() => editHandler(product)}
                  className="btn btn-sm btn-outline-primary"
                >
                  <CiEdit className="size-6 text-[blue]" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteHandler(product.id)}
                >
                  <MdDelete className="size-5 text-[red]" />
                </button>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};

export default HomeProducts;
