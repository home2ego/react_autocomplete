import React, { useState } from 'react';
import cn from 'classnames';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
  query: string;
  onPersonSelect: (person: Person) => void;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Dropdown: React.FC<Props> = ({
  people,
  query,
  onPersonSelect,
  onQueryChange,
}) => {
  const [isActive, setActive] = useState(false);

  return (
    <div className={cn('dropdown', { 'is-active': isActive })}>
      <div className="dropdown-trigger">
        <input
          type="text"
          placeholder="Enter a part of the name"
          className="input"
          data-cy="search-input"
          value={query}
          onChange={onQueryChange}
          onFocus={() => setActive(true)}
          onBlur={() =>
            setTimeout(() => {
              setActive(false);
            }, 25)
          }
        />
      </div>

      {!people.length || (
        <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
          <div className="dropdown-content">
            {people.map(person => (
              <div
                key={person.slug}
                className="dropdown-item"
                data-cy="suggestion-item"
              >
                <p
                  className={cn('is-clickable', {
                    'has-text-link': person.sex === 'm',
                    'has-text-danger': person.sex === 'f',
                  })}
                  onClick={() => onPersonSelect(person)}
                >
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
