import { Grid, Button } from '@mui/material';

interface IButtons {
    digit: string;
    enter: (digit: string) => void;
    xs?: number;
}

export const Buttons: React.FC<IButtons> = ({ digit, enter, xs = 3 }) => {
    return (
        <Grid item xs={xs}>
            <Button fullWidth variant="outlined" onClick={() => enter(digit)}>
                {digit}
            </Button>
        </Grid>
    );
};
