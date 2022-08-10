import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PhoneList from './phone-list/PhoneList';
import PhoneDetail from './phone-detail/PhoneDetail';

const App: React.FC = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={1000}
        classNames={{
          appear: 'ng-appear',
          appearActive: 'ng-appear-active',
          appearDone: 'ng-appear-done',
          enter: 'ng-enter',
          enterActive: 'ng-enter-active',
          enterDone: 'ng-enter-done',
          exit: 'ng-leave',
          exitActive: 'ng-leave-active',
          exitDone: 'ng-leave-done'
        }}>
        <div className="view-frame">
          <Switch>
            <Route path="/phones" component={PhoneList} exact />
            <Route path="/phones/:phoneId" component={PhoneDetail} exact />
            <Redirect to="/phones" />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
