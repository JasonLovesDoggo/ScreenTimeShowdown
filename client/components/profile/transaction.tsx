import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Transaction } from "../../util/models";

export const TransactionCard = ({ transaction }: { transaction: Transaction }): JSX.Element => {
    return (
        <Box sx={{
            backgroundColor: "#eeeeee",
            padding: "1em",
            maxWidth: "fit-content",
            boxShadow: "2.5px 2.5px 2.5px",
            borderRadius: "10px"
        }}>
            <Typography variant="h5">Paybilt Transaction</Typography>
            <Typography variant="body1">Amount: ${transaction.amount}</Typography>
            <Typography variant="body1">Paybilt ID: {transaction.paybiltid}</Typography>
            <Typography variant="body1">Status: {transaction.status}</Typography>
        </Box>
    );
}
