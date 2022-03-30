import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "./Searchbar.styled";
import { ReactComponent as SearchIcon } from "../../icon/search_icon.svg";
function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState("");
  const handleNameChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (imageName.trim() === "") {
      return alert("Please, enter a text!");
    }

    onSubmit(imageName);
    setImageName("");
  };
  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <span>
            <SearchIcon />
          </span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          value={imageName}
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
