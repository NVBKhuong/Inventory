import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Typography, Stack,Divider } from "@mui/material";
import CommonTable from "../Table/CommonTable";
import { IProduct } from "../../models/Produdct";
import instance from "../../service/api/customAxios";

interface StatisticOrder{
  "revenue": number,
  "discount": number,
  "pendingValue": number,
  "canceledValue": number,
  "revenueFromCash": number,
  "revenueFromVNPay": number,
  "totalOrders": number,
  "canceledOrders": number,
  "completedOrders": number,
  "ongoingOrders": number,
  "pendingPaymentOrders": number,
  "from": string,
  "to": string
}

const addDotNumber = (money: any) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const columns: MRT_ColumnDef<IProduct>[] = [
    {
        accessorKey: "name",
        header: "Product name",
    },
    {
        accessorKey: "origin",
        header: "Origin",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "sold",
        header: "Sold",
    },
    {
        accessorKey: "revenue",
        header: "Revenue",
        Cell: ({ row }) => (
          <Typography sx={{alignItems: 'center' }}>{row.original.revenue && addDotNumber(row.original.revenue.toString())} đ</Typography>
        ),
    },
    {
        accessorKey: "rating",
        header: "Rating",
        Cell: ({ row }) => (
          <Typography sx={{alignItems: 'center' }}>{row.original.rating && row.original.rating} / 5</Typography>
        ),
    },
];

const RevenueList = () => {
    const [revenue, setRevenue] = useState<IProduct[] | []>([]);
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [dashboardOrder,setDashboardOrder] = useState<StatisticOrder | null>(null)
    const load = async() =>{
      await instance.post('/statistics/products',{params: {pageSize: 0, pageNumber:1000}},{})
      .then(res => {
        setTotalRevenue(res.data.revenue)
        setRevenue(res.data.productRevenues)
      })
      .catch(err => console.log(err))
    }

    const load1 = async() => {
      await instance.post('/statistics/orders',{params: {from: "", to: ""}})
      .then((res:any) => {
        setDashboardOrder(res.data)})
      .catch(err => console.log(err))
    }
    useEffect(() => {
      load();
      load1();
    }, []);
    
    return (
        <Stack sx={{ m: "2rem 0" }}>
          <Typography fontSize={24}>Total Revenue: {addDotNumber(totalRevenue.toString())} đ</Typography>
          <Divider/>
            {revenue.length>0 && <CommonTable note={false}
                columns={columns}
                data={revenue}
            />}
            <Typography fontSize={24}>Orders</Typography>
            <Stack direction='column' className='w-[70%] pt-2'>
              {dashboardOrder && [
                {title: 'Pending Payment Orders', value: dashboardOrder?.pendingPaymentOrders},
                {title: 'Ongoing Orders', value: dashboardOrder?.ongoingOrders},
                {title: 'Canceled Orders', value: dashboardOrder?.canceledOrders},
                {title: 'Completed Orders', value: dashboardOrder?.completedOrders},
                {title: 'Total Orders', value: dashboardOrder?.totalOrders},
                ].map((item, idx) => <div key={idx}>
              <Stack direction='row' justifyContent={'space-between'} className='pt-2' > 
                <Typography fontWeight={'bold'} fontSize='14'>{item.title}</Typography>
                <Typography fontSize='14'>{item.value}</Typography>
              </Stack>
              <Divider className='pb-2'/>
              </div>)}
              <Stack direction='row' justifyContent={'space-between'} className='pt-2'>
                <Typography fontWeight={'bold'} fontSize='14'>Revenue From Cash</Typography>
                <Typography fontSize='14'>{dashboardOrder?.revenueFromCash && addDotNumber(dashboardOrder?.revenueFromCash.toString())} đ</Typography>
              </Stack>
              <Divider className='pb-2'/>
              <Stack direction='row' justifyContent={'space-between'} className='pt-2'>
                <Typography fontWeight={'bold'} fontSize='14'>Revenue From Internet Banking</Typography>
                <Typography fontSize='14'>{dashboardOrder?.revenueFromCash&& addDotNumber(dashboardOrder?.revenueFromVNPay.toString())} đ</Typography>
              </Stack>
              <Divider className='pb-2'/>
            </Stack>
        </Stack>
    );
};

export default RevenueList;
