import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LayoutDefault from 'layouts/LayoutDefault';
import NoLayout from 'layouts/NoLayout';

const AppRoute = ({
    component: Component,
    footer = true,
    layout = true,
    noLayoutFooter = false,
    noLayoutBtn = false,
    privateRoute = false,
    redirectRoute = '/register',
    scrollBtn = false
}) => {
    const authenticated = useSelector(({ auth }) => auth.user.authenticated);

    if (!Component) return null;

    return (
        <>
            {privateRoute && !authenticated ? (
                <Redirect to={redirectRoute} />
            ) : (
                <>
                    {layout ? (
                        <LayoutDefault footer={footer} scrollBtn={scrollBtn}>
                            <Component />
                        </LayoutDefault>
                    ) : (
                        <NoLayout footer={noLayoutFooter} scrollBtn={noLayoutBtn}>
                            <Component />
                        </NoLayout>
                    )}
                </>
            )}
        </>
    );
};

export default AppRoute;
