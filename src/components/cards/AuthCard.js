import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parsePath } from 'utils/helpers';
import ForgotPassword from 'pages/account/ForgotPassword';
import LoginForm from 'components/forms/LoginForm';
import SignupForm from 'components/forms/SignupForm';
import TitleDecoration from 'components/headings/TitleDecoration';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '40px 8%'
    },
    titleWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '32px',
        '& img': {
            height: '40px',
            marginRight: '16px'
        }
    },
    linkText: {
        marginTop: '16px',
        textAlign: 'center',
        '& a': {
            color: theme.palette.primary.main
        }
    },
    linkTextWrapper: {
        margin: '2rem 0'
    }
}));

const AuthCard = ({ form = 'login', onSubmit = () => {} }) => {
    const classes = useStyles();

    const appInformation = useSelector(({ ui }) => ui.appInformation);

    return (
        <Paper className={classes.root}>
            <div className={classes.titleWrapper}>
                {appInformation?.appLogo && (
                    <img src={parsePath(appInformation?.appLogo)} alt={appInformation?.appTitle} />
                )}
                <div>
                    {form === 'forgot-pwd' && <Typography variant="h5">Reset Password</Typography>}
                    {form === 'login' && <Typography variant="h5">Login</Typography>}
                    {form === 'signup' && <Typography variant="h5">Register</Typography>}
                    <TitleDecoration />
                </div>
            </div>
            {form === 'forgot-pwd' && (
                <>
                    <ForgotPassword onSubmit={onSubmit} />
                    <Typography className={classes.linkText} variant="body1">
                        <Link to={parsePath('/login')}>Go back to Login</Link>
                    </Typography>
                </>
            )}
            {form === 'signup' && (
                <>
                    <SignupForm onSubmit={onSubmit} />
                    <Typography className={classes.linkText} variant="body1">
                        Already have an account?&nbsp;&nbsp;&nbsp;<Link to={parsePath('/login')}>Login</Link>
                    </Typography>
                </>
            )}
            {form === 'login' && (
                <>
                    <LoginForm onSubmit={onSubmit} />
                    <div className={classes.linkTextWrapper}>
                        <Typography className={classes.linkText} variant="body1">
                            Have you forgotten your password?&nbsp;&nbsp;&nbsp;
                            <Link to={parsePath('/forgot-password')}>Reset Password</Link>
                        </Typography>
                    </div>
                    <Typography className={classes.linkText} variant="body1">
                        Don't have an account?&nbsp;&nbsp;&nbsp;<Link to={parsePath('/register')}>Register</Link>
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default AuthCard;
