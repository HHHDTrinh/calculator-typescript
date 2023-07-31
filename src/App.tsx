import { useState } from 'react';
import { Container, Paper, styled, Grid, Button } from '@mui/material';

import { Operations } from './Operations';
import { Buttons } from './Buttons';

const OutputContainer = styled('div')(({ theme }) => ({
    width: '100%',
    textAlign: 'right',
    height: '2em',
    fontSize: '3em',
    overflow: 'hidden',
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    borderRadius: 15,
}));

function App() {
    const [currentValue, setCurrentValue] = useState<string>('0');
    const [currentOperation, setCurrentOperation] = useState<string>('');
    const [overwrite, setOverwrite] = useState<boolean>(true);
    const [previousValue, setPreviousValue] = useState<string>('');

    const handleACButton = () => {
        setPreviousValue('');
        setCurrentOperation('');
        setCurrentValue('0');
        setOverwrite(true);
    };

    const handleDeleteButton = () => {
        setCurrentValue(currentValue.slice(0, currentValue.length - 1));
        setOverwrite(true);
    };

    const handlePercentButton = () => {
        const curr = parseFloat(currentValue);
        setCurrentValue((curr / 100).toString());
    };

    const handleCalculate = () => {
        if (!previousValue || !currentOperation) return currentValue;

        const curr = parseFloat(currentValue);
        const prev = parseFloat(previousValue);

        let result;
        switch (currentOperation) {
            case '÷':
                result = prev / curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '+':
                result = prev + curr;
                break;
        }
        return result;
    };

    const handleEqual = () => {
        const val = handleCalculate();
        setCurrentValue(`${val}`);
        setPreviousValue('');
        setCurrentOperation('');
        setOverwrite(true);
    };

    const selectDigit = (digit: string) => {
        if (currentValue[0] === '0' && digit === '0') return;
        if (currentValue.includes('.') && digit === '.') return;
        if (overwrite && digit !== '.') {
            setCurrentValue(digit);
        } else {
            setCurrentValue(`${currentValue}${digit}`);
        }
        setOverwrite(false);
    };

    const selectOperation = (operation: string) => {
        if (previousValue) {
            const val = handleCalculate();
            setCurrentValue(`${val}`);
            setPreviousValue(`${val}`);
        } else {
            setPreviousValue(currentValue);
        }
        setCurrentOperation(operation);
        setOverwrite(true);
    };

    return (
        <Container maxWidth="sm">
            <CalculatorBase elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <OutputContainer data-testid="output">
                            {currentValue}
                        </OutputContainer>
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <Operations
                            operation={'AC'}
                            selectOperation={handleACButton}
                            selectedOperation={currentOperation}
                        />
                        <Operations
                            operation={'C'}
                            selectOperation={handleDeleteButton}
                            selectedOperation={currentOperation}
                        />
                        <Operations
                            operation={'%'}
                            selectOperation={handlePercentButton}
                            selectedOperation={currentOperation}
                        />
                        <Operations
                            operation={'÷'}
                            selectOperation={selectOperation}
                            selectedOperation={currentOperation}
                        />
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <Buttons digit={'7'} enter={selectDigit} />
                        <Buttons digit={'8'} enter={selectDigit} />
                        <Buttons digit={'9'} enter={selectDigit} />
                        <Operations
                            operation={'*'}
                            selectOperation={selectOperation}
                            selectedOperation={currentOperation}
                        />
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <Buttons digit={'4'} enter={selectDigit} />
                        <Buttons digit={'5'} enter={selectDigit} />
                        <Buttons digit={'6'} enter={selectDigit} />
                        <Operations
                            operation={'-'}
                            selectOperation={selectOperation}
                            selectedOperation={currentOperation}
                        />
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <Buttons digit={'1'} enter={selectDigit} />
                        <Buttons digit={'2'} enter={selectDigit} />
                        <Buttons digit={'3'} enter={selectDigit} />

                        <Operations
                            operation={'+'}
                            selectOperation={selectOperation}
                            selectedOperation={currentOperation}
                        />
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <Buttons xs={6} digit={'0'} enter={selectDigit} />
                        <Buttons digit={'.'} enter={selectDigit} />

                        <Grid item xs={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleEqual}
                            >
                                =
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CalculatorBase>
        </Container>
    );
}

export default App;
