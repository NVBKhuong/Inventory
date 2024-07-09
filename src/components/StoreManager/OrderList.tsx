import React, { useEffect, useState } from "react";
import { Stack, MenuItem, Select } from "@mui/material";
import CommonTable from "../Table/CommonTable";
import instance from "../../service/api/customAxios";
import { MRT_ColumnDef } from "material-react-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface Order {
  id: string;
  receiver: string;
  address: string;
  phone: string;
  paymentMethod: string;
  status: string;
  createAt: string;
}

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    try {
      const response = await instance.post("/orders/filter?pageSize=1000", {});
      const sortedOrders = response.data.data.sort((a: Order, b: Order) =>
        new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      let endpoint;
      switch (newStatus) {
        case "Confirmed":
          endpoint = `/orders/confirm?orderId=${orderId}`;
          break;
        case "Delivering":
          endpoint = `/orders/deliver?orderId=${orderId}`;
          break;
        case "Completed":
          endpoint = `/orders/complete?orderId=${orderId}`;
          break;
        case "Canceled":
          endpoint = `/orders/cancel?orderId=${orderId}`;
          break;
        // Add cases for "Pending" and "Paid" if necessary
        default:
          throw new Error("Unknown status");
      }

      const response = await instance.put(endpoint);
      console.log("Update response:", response);
      toast.success("Order status updated successfully.");
      loadOrders();
    } catch (error) {
      console.error(`Error updating order ${orderId} status:`, error);

      // Type guard to handle the 'error' type
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update order status.");
      }
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const columns: MRT_ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "receiver",
      header: "Receiver",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell, row }: { cell: any; row: { original: Order } }) => (
        <Select
          value={cell.getValue()}
          onChange={(event) =>
            handleStatusChange(row.original.id, event.target.value)
          }
          disabled={cell.getValue() === "Completed"}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Confirmed">Confirmed</MenuItem>
          <MenuItem value="Delivering">Delivering</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>
      ),
    },
    {
      accessorKey: "createAt",
      header: "Created At",
      Cell: ({ cell }: { cell: any }) =>
        new Date(cell.getValue()).toLocaleString(),
    },
  ];

  return (
    <Stack sx={{ m: "2rem 0" }}>
      <CommonTable columns={columns} data={orders} />
      <ToastContainer />
    </Stack>
  );
};

export default OrderManagementPage;
