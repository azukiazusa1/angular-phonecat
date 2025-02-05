import React from 'react';
import { Phone } from './types';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

type Props = {
  phones: Phone[];
  query?: string;
  orderProp: 'name' | 'age';
};

const PhoneItems: React.FC<Props> = ({ phones, query, orderProp }) => {
  const filteredPhones = phones.filter((phone) => {
    if (!query) {
      return true;
    }
    return Object.values(phone).some((value) => {
      return String(value).toLowerCase().includes(query.toLowerCase());
    });
  });
  const sortedPhones = filteredPhones.sort((a, b) => {
    if (a[orderProp] < b[orderProp]) {
      return -1;
    }
    if (a[orderProp] > b[orderProp]) {
      return 1;
    }
    return 0;
  });

  return (
    <Flipper flipKey={orderProp}>
      <TransitionGroup component="ul" className="phones">
        {sortedPhones.map((phone) => (
          <CSSTransition
            key={phone.id}
            timeout={500}
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
            <Flipped flipId={phone.id}>
              <li className="thumbnail phone-list-item">
                <Link to={`/phones/${phone.id}`} className="thumb">
                  <img src={phone.imageUrl} alt={phone.name} />
                </Link>
                <Link to={`/phones/${phone.id}`}>{phone.name}</Link>
                <p>{phone.snippet}</p>
              </li>
            </Flipped>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Flipper>
  );
};

export default PhoneItems;
