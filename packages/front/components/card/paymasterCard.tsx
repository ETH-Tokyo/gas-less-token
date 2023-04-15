import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import { FC } from "react";

const PaymasterCard: FC<{ address: string }> = ({ address }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">TokenPaymaster address: {address}</Typography>
        <Typography variant="body1" color="text.secondary">
          your token paymaster is deployed. before using contract, you need to
          below tasks.
          <br />
          1. deposit ETH to paymaster contract. call deposit() function via
          polygon scan.
          <br />
          2. stake ETH to paymaster contract. call addStake() function via
          polygon scan.
          <br />
          3. mint ERC20 to account address. call mintTokens() function via
          polygon scan.
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          href={`https://mumbai.polygonscan.com/address/${address}`}
          target="_blank"
          rel="polygon scan"
        >
          <Button size="small">polygon scan</Button>
        </Link>
        <Link href={`/user/${address}`}>
          <Button size="small">user page</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PaymasterCard;
