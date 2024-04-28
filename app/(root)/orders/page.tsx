import Search from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { IOrderItem } from "@/lib/database/models/order.model";
import xlsx from "json-as-xlsx";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: string;
  eventTitle: string;
  eventId: string;
  buyer: string;
}

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });


  const handle = () => {
    "use client"
    const transformedData = orders.map((order: Order) => ({
      sheet: "Orders", // Name of the sheet
      columns: [
        { label: "_id", value: "_id" },
        { label: "Created At", value: "createdAt" },
        { label: "Total Amount", value: "totalAmount" },
        { label: "Event Title", value: "eventTitle" },
        { label: "Event ID", value: "eventId" },
        { label: "Buyer", value: "buyer" },
      ],
      content: [order],
    }));

    const settings = {
      fileName: "OrdersSpreadsheet", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: true, // Display the columns from right-to-left (the default value is false)
    };

    xlsx(transformedData, settings);
  };



  return (
    <>
      <section className=" bg-dark-2 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white">
          Orders

        </h3>
      </section>

      <section className="wrapper mt-8">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left text-grey-400">
                Order ID
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left text-grey-400">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left text-grey-400">
                Buyer
              </th>
              <th className="min-w-[100px] py-3 text-left text-grey-400">
                Created
              </th>
              <th className="min-w-[100px] py-3 text-right text-grey-400">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4 text-white">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[150px] py-4 text-white">
                        {row.buyer}
                      </td>
                      <td className="min-w-[100px] py-4 text-white">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-right text-white">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;


