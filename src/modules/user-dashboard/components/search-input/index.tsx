import { type ChangeEvent } from 'react';
import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import { Button } from '../../../../shared/components/button';
import './search-input.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchInput({ value, onChange, onSearch }: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-input-container">
      <label htmlFor="user-search" className="search-label">
        {DASHBOARD_CONSTANTS.searchLabel}
      </label>
      <div className="search-input-wrapper">
        <input
          id="user-search"
          type="text"
          className="search-input"
          placeholder={DASHBOARD_CONSTANTS.searchPlaceholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Search users by name"
        />
        <Button onClick={onSearch} aria-label="Search">
          Search
        </Button>
      </div>
    </div>
  );
}

