import React from "react";

const Header = ({ title='Default title' }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
