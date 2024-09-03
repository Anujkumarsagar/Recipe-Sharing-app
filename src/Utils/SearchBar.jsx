import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full pl-8"
        placeholder="Search recipes..."
        type="search"
        value=""
      />
    </div>
  );
};

export default SearchBar;
