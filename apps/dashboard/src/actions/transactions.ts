"use server";

import { createTransactions } from "@midday/supabase/server";
import { capitalCase } from "change-case";
import { getAccessToken, getTransactions } from "./gocardless";

export async function initialTransactionsSync(ids: string[]) {
  const { access } = await getAccessToken();

  await Promise.all(
    ids.map(async (id) => {
      const { transactions } = await getTransactions({
        token: access,
        id,
      });

      await createTransactions(
        transactions.booked.map((data) => ({
          transaction_id: data.transactionId,
          reference_id: data.entryReference,
          booking_date: data.bookingDate,
          value_date: data.valueDate,
          display: capitalCase(data.additionalInformation),
          original: data.additionalInformation,
          transaction_code: data.proprietaryBankTransactionCode,
          internal_id: data.internalTransactionId,
          amount: data.transactionAmount.amount,
          currency: data.transactionAmount.currency,
          bank_account_id: id,
        })),
      );
    }),
  );
}