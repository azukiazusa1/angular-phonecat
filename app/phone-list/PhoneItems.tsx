import angular from 'angular';
import React from 'react';
import { react2angular } from 'react2angular';
import { Phone } from './types';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
type Props = {
  phones: (Phone & { height: number })[];
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
                <a href={`#!/phones/${phone.id}`} className="thumb">
                  <img src={phone.imageUrl} alt={phone.name} />
                </a>
                <a href={`#!/phones/${phone.id}`}>{phone.name}</a>
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

angular
  .module('phoneList')
  .component('phoneItems', react2angular(PhoneItems, ['phones', 'query', 'orderProp']));
