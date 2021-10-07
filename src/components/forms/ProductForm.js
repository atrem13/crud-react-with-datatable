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
      <div className="mb-10">
        <input
          name="name"
          // {...formMethods.register("name")}
          value={watchName}
          onChange={(e) => {
            formMethods.setValue("name", e.target.value, {
              shouldValidate: true
            });
          }}
        />
      </div>
      <div className="mb-10">
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
        />
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={onCancel}>
          CANCEL
        </button>
        <button type="submit">{initialValue ? "UPDATE" : "CREATE"}</button>
      </div>
    </form>
  );
};

export default ProductForm;
