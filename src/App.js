import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataList from "./components/DataList";
import { api } from "./utils/request";
import Modal from "./components/Modal";
import ProductForm from "./components/forms/ProductForm";
import Swal from 'sweetalert2';

const App = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdd, setIsAdd] = useState(false);

  const loadProducts = () => {
    api()
      .get("product")
      .then((res) => {
        dispatch({ type: "PRODUCTS/SET_PRODUCTS", payload: [...res.data] });
      })
      .catch((err) => console.log(err.response));
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Delete'
   }).then((result) => {
      api()
        .put(`product/${id}`, { isActive: false })
        .then((res) => {
          loadProducts();
        })
        .catch((err) => console.log(err.response));
   })
  };

  const createProduct = (values) => {
    api()
      .post(`product`, { ...values, isActive: true })
      .then((res) => {
        loadProducts();
        console.log("success create");
      })
      .catch((err) => console.log(err.response));
  };

  const updateProduct = (id, values) => {
    Swal.fire({
      title: 'Warning',
      text: 'Are you sure want to Update this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#66d964',
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Update'
   }).then((result) => {
      api()
        .put(`product/${id}`, { ...values })
        .then((res) => {
          // console.log(res.data);
          loadProducts();
          console.log("success update");
        })
        .catch((err) => console.log(err.response));
   })
  };

  const productColumns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Quantity",
      accessor: "qty"
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: ({ row }) => {
        return "Something";
      }
    },
    {
      Header: "Status",
      accessor: "isActive",
      Cell: ({ row }) => {
        return row.original?.isActive ? "Active" : "Not Active";
      }
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <div>
            <button
              type="button"
              className="inline-flex mr-3 text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded mb-5"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(row.original);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded mb-5"
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(row.original.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="text-gray-400 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="ml-5">
          <div className="row">
            <div className="col-12 text-right">
              <button type="button" onClick={() => setIsAdd(true)} className="inline-flex text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded mb-5">Add Product</button>
            </div>
          </div>
          <DataList
            columns={productColumns}
            data={products || []}
            // onRowClick={(row) => {
            //   setSelectedProduct(row.original);
            // }}
          />

          <Modal title="Add Product" show={isAdd} onClose={() => setIsAdd(false)}>
            <ProductForm
              onCancel={() => setIsAdd(false)}
              onSubmit={(values) => {
                createProduct(values);
                setIsAdd(false);
              }}
            />
          </Modal>

          <Modal
            title="Edit Product"
            show={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          >
            <ProductForm
              initialValue={selectedProduct}
              onCancel={() => setSelectedProduct(null)}
              onSubmit={(values) => {
                updateProduct(selectedProduct.id, values);
                setSelectedProduct(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default App;
