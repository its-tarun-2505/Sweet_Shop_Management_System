import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSweets, searchSweets } from "../../features/sweetShop/shopController";
import SweetFilters from "./SweetFilters";
import SweetGrid from "./SweetGrid";

const SweetsContainer = () => {
  const dispatch = useDispatch();
  const { sweets, isLoading, isError, message } = useSelector(
    (state) => state.sweetshop
  );

  // Local state for search & filter inputs
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Extract unique categories from sweets list
  const categories = [...new Set(sweets.map((s) => s.category))];

  // Fetch all sweets on first render
  useEffect(() => {
    dispatch(getAllSweets());
  }, [dispatch]);

  // Update filter state on input change
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Apply filters by calling search API
  const applyFilters = () => {
    dispatch(searchSweets(filters));
  };

  // Loading & error states
  if (isLoading) return <p>Loading sweets...</p>;
  if (isError) return <p>{message}</p>;

  return (
    <>
      <SweetFilters
        filters={filters}
        categories={categories}
        onChange={handleChange}
        onApply={applyFilters}
      />

      <SweetGrid sweets={sweets} />
    </>
  );
};

export default SweetsContainer;
