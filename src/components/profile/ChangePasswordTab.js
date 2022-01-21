import { withRouter } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        padding: '2rem',
        [theme.breakpoints.up('md')]: {
            marginTop: '-100px'
        }
    },
    button: {
        margin: '1rem auto'
    },
    card: {
        flexDirection: 'column',
        margin: '0 1rem'
    },
    field: {
        marginBottom: '1rem'
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        margin: '1rem 0 2rem 0'
    },
    wrapper: {
        flexDirection: 'column'
    }
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    newPassword: yup
        .string()
        .required('Please enter your new password.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

const defaultValues = {
    newPassword: '',
    passwordConfirm: ''
};

function ChangePasswordTab({ history, onSubmit: onHandleSubmit = () => {} }) {
    const classes = useStyles();

    const { control, formState, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, errors } = formState;

    async function onSubmit({ newPassword }) {
        const response = await onHandleSubmit({ newPassword });
        if (response?.status === 'done') history.push('/');
    }

    return (
        <div className={clsx(classes.root, classes.flexCenter)}>
            <div className={classes.flexCenter}>
                <div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card>
                        <CardContent className={clsx(classes.card, classes.flexCenter)}>
                            <Typography className={classes.title} variant="h6">
                                Change your password
                            </Typography>

                            <form
                                name="resetForm"
                                noValidate
                                className={clsx(classes.wrapper, classes.flexCenter)}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Controller
                                    name="newPassword"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className={classes.field}
                                            label="New Password"
                                            type="password"
                                            error={!!errors.newPassword}
                                            helperText={errors?.newPassword?.message}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name="passwordConfirm"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className={classes.field}
                                            label="Password (Confirm)"
                                            type="password"
                                            error={!!errors.passwordConfirm}
                                            helperText={errors?.passwordConfirm?.message}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    )}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    aria-label="Reset"
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    Change my password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default withRouter(ChangePasswordTab);
