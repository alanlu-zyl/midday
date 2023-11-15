import { cn } from "@midday/ui/utils";
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { format } from "date-fns";
import * as React from "react";
import { getI18n } from "../i18n";

type Transaction = {
  id: string;
  date: string;
  amount: number;
  name: string;
  currency: string;
};

interface TransactionsEmailEmailProps {
  fullName: string;
  transactions: Transaction[];
  locale: string;
}

const defaultTransactions = [
  {
    id: "1",
    date: new Date().toISOString(),
    amount: -1000,
    currency: "USD",
    name: "Spotify",
  },
  {
    id: "2",
    date: new Date().toISOString(),
    amount: 1000,
    currency: "USD",
    name: "H23504959",
  },
  {
    id: "3",
    date: new Date().toISOString(),
    amount: -1000,
    currency: "USD",
    name: "Webflow",
  },
  {
    id: "4",
    date: new Date().toISOString(),
    amount: -1000,
    currency: "USD",
    name: "Netflix",
  },
];

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://midday.ai/email"
    : "http://localhost:3000/email";

const baseAppUrl =
  process.env.NODE_ENV === "production"
    ? "https://app.midday.ai"
    : "http://localhost:3001";

export const TransactionsEmail = ({
  fullName = "Viktor Hofte",
  transactions = defaultTransactions,
  locale = "en",
}: TransactionsEmailEmailProps) => {
  const { t } = getI18n({ locale });
  const firstName = fullName.split(" ").at(0);

  const previewText = t(
    { id: "transactions.preview" },
    { firstName: "Pontus", numberOfTransactions: transactions.length }
  );

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Instrument Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/instrumentsans/v1/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0She1ZuWi3hKpA.woff2",
            format: "woff2",
          }}
        />
        <Font
          fontFamily="Instrument Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/instrumentsans/v1/pximypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr-yp2JGEJOH9npST3-TfykywN2u7ZWwU.woff2",
            format: "woff2",
          }}
          fontWeight={500}
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#F0EFEC] my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#DCDAD2] rounded my-[40px] mx-auto p-[20px] w-[560px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="45"
                height="45"
                alt="Midday"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-[#121212] text-[21px] font-normal text-center p-0 my-[30px] mx-0">
              You have <span className="font-semibold">5 transactions</span>{" "}
              thats missing <br />
              receipts.
            </Heading>
            <Text className="text-[#121212] text-[14px] leading-[24px]">
              Hi {firstName},<br /> <br />
              We found <span className="font-semibold">
                5 transactions
              </span>{" "}
              thats missing receipts. Feel free to attach them to ease your own
              or your accountants work for upcoming declerations.
            </Text>

            <br />

            <table style={{ width: "100%" }} className="border-collapse w-full">
              <thead>
                <tr className="border-0 border-t-[1px] border-b-[1px] border-solid border-[#DCDAD2] h-[45px]">
                  <th align="left">
                    <Text className="text-[14px] font-semibold m-0 p-0">
                      Date
                    </Text>
                  </th>
                  <th align="left" style={{ width: "50%" }}>
                    <Text className="text-[14px] font-semibold m-0 p-0">
                      To/From
                    </Text>
                  </th>
                  <th align="left">
                    <Text className="text-[14px] font-semibold m-0 p-0">
                      Amount
                    </Text>
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions?.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-0 border-b-[1px] border-solid border-[#DCDAD2] h-[45px]"
                  >
                    <td align="left">
                      <Text className="text-[14px] m-0 p-0 mt-1 pb-1">
                        {format(new Date(transaction.date), "MMM d")}
                      </Text>
                    </td>
                    <td align="left" style={{ width: "50%" }}>
                      <Link
                        href={`${baseAppUrl}/transactions?id=${transaction.id}`}
                        className={cn(
                          "text-[#121212]",
                          transaction.amount > 0 && "text-[#00C969]"
                        )}
                      >
                        <Text className="text-[14px] m-0 p-0 mt-1 pb-1">
                          {transaction.name}
                        </Text>
                      </Link>
                    </td>
                    <td align="left">
                      <Text
                        className={cn(
                          "text-[14px] m-0 p-0 mt-1 pb-1",
                          transaction.amount > 0 && "text-[#00C969]"
                        )}
                      >
                        {Intl.NumberFormat(locale, {
                          style: "currency",
                          currency: transaction.currency,
                        }).format(transaction.amount)}
                      </Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded-xl text-white text-[12px] font-semibold no-underline text-center px-6 py-3"
                href={`${baseAppUrl}/transactions?from_id=${
                  transactions.at(0)?.id
                }`}
              >
                View transactions
              </Button>
            </Section>
            <Hr className="border border-solid border-[#DCDAD2] my-[45px] mx-0 w-full" />
            <Text className="text-[#878787] text-[12px] leading-[24px]">
              Nam imperdiet congue volutpat. Nulla quis facilisis lacus. Vivamus
              convallis sit amet lectus eget tincidunt. Vestibulum vehicula
              rutrum nisl, sed faucibus neque. Donec lacus mi, rhoncus at dictum
              eget, pulvinar at metus. Donec cursus tellus erat, a hendrerit
              elit rutrum ut. Fusce quis tristique ligula. Etiam sit amet enim
              vitae mauris auctor blandit id et nibh.
            </Text>

            <Link href={`${baseAppUrl}/settings/notifications`}>
              <Text className="text-[#878787] text-[12px] underline">
                Notification preferences
              </Text>
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TransactionsEmail;