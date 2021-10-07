import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  name: yup.string().required("required"),
  qty: yup.number().required("Required")
});

const ProductForm = (props) => {
  const { initialValue, onCancel, onSubmit } = props;
  const [isSubmiting, setIsSubmiting] = useState(false);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      qty: ""
    }
  });

  const [watchName, watchQty] = formMethods.watch(["name", "qty"]);

  useEffect(() => {
    if (!!initialValue) {
      formMethods.setValue("name", initialValue.name, {
        shouldValidate: true
      });
      formMethods.setValue("qty", initialValue.qty, {
        shouldValidate: true
      });
    }
  }, [initialValue]);

  return (
    <form name="product-form" onSubmit={formMethods.handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          name="name"
          // {...formMethods.register("name")}
          value={watchName}
          onChange={(e) => {
            formMethods.setValue("name", e.target.value, {
              shouldValidate: true
            });
          }}
          className="w-full rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-indigo-yellow-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="mb-7">
        <input
          name="qty"
          // {...formMethods.register("name")}
          value={watchQty}
          type="number"
          onChange={(e) => {
            formMethods.setValue("qty", e.target.value, {
              shouldValidate: true
            });
          }}
          className="w-full rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-indigo-yellow-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="row">
        <div className="col-12 text-right">
          <button className="mr-3 inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="inline-flex text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded">{initialValue ? "Update" : "Create"}</button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
