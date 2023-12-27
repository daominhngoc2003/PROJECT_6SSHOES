import cron from "node-cron";
import Bill from "../../model/bill.js";
import Payment_status from "../../model/payment_status.js";

export const upDateBillFinish = async (req, res) => {
  try {
    const bills = await Bill.find({}).populate("payment_status");

    let DeliveredStatus = await Payment_status.findOne({
      pStatus_name: "Delivered",
    });

    for (const bill of bills) {
      if (bill.payment_status.pStatus_name === "Delivering") {
        const updatedAt = new Date(bill.updatedAt);
        const currentDate = new Date();

        const differenceInTime = currentDate - updatedAt;

        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays > 3) {
          bill.payment_status = DeliveredStatus._id;
          bill.pStatus_name = DeliveredStatus.pStatus_name;
          bill.status = "Paid";
          bill.save();
        }
      }
    }
    return res.json({
      bills,
    });
  } catch (error) {}
};

cron.schedule("* * * * *", async () => {
  try {
    await upDateBillFinish();
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
