import { Card, CardContent, Link, Typography } from "@mui/material";
import { FC } from "react";

const TxCard: FC<{
  address: string;
  level: number;
  rate: number;
}> = ({ address, level, rate }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Your account details</Typography>
        <Typography variant="body1" color="text.secondary">
          Address:{" "}
          <Link
            href={`https://mumbai.polygonscan.com/address/${address}`}
            target="_blank"
            rel="polygon scan"
          >
            {address}
          </Link>
          <br />
          Level: {level} / ETH:ERC20 = 1:{rate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TxCard;
