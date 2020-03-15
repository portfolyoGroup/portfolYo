import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AnimatedPage from './AnimatedPage'
import { Route, Switch, withRouter } from 'react-router-dom';
import './AnimatedPage.css'

const childOf = (...types) => {
    let fieldType = PropTypes.shape({
        type: PropTypes.oneOf(types),
    });

    return PropTypes.oneOfType([
        fieldType,
        PropTypes.arrayOf(fieldType),
    ]);
}

const propTypes = {
    CurrentPage: childOf(Route).isRequired,
    NextPage: childOf(Route).isRequired,
    location: PropTypes.string.isRequired,
    animation: PropTypes.string.isRequired
}

const Animator = ({ currentPage, nextPage, location }) => {
    return (
        <TransitionGroup component='div'>
            <CSSTransition
                mountOnEnter={false}
                unmountOnExit={true}
                key={location.pathname.split("/")[1] || '/'}
                classNames="page"
                timeout={{
                    enter: 1000,
                    exit: 1000,
                }}
            >
                <Switch location={location}>
                    <AnimatedPage>
                        {currentPage}
                    </AnimatedPage>
                    <AnimatedPage>
                        {nextPage}
                    </AnimatedPage>
                </Switch>
            </CSSTransition>
        </TransitionGroup >
    );
}

Animator.propTypes = propTypes;
export default (Animator);