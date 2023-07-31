import { Grid, Button, styled } from '@mui/material';

interface IOperations {
    operation: string;
    selectOperation: (operation: string) => void;
    selectedOperation: string;
}

const StyledButton = styled(Button)<{ selected: boolean }>((props) => ({
    backgroundColor: 'rgba(254, 241, 73, .1)',
    borderColor: props.selected ? '#fff' : 'rgba(255, 241, 73, .5)',
}));

export const Operations: React.FC<IOperations> = ({
    operation,
    selectOperation,
    selectedOperation,
}) => {
    return (
        <Grid item xs={3}>
            <StyledButton
                selected={selectedOperation === operation}
                fullWidth
                variant="outlined"
                onClick={() => selectOperation(operation)}
            >
                {operation}
            </StyledButton>
        </Grid>
    );
};
