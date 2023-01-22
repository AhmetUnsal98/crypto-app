import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import "../../scss/main.scss";
import SearchBar from "./SearchBar";

const Table = () => {
  const [data, setCoins] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCoins();
  }, []);

  const COLUMNS = [
    {
      Header: " ",
      Cell: (tableProps) => (
        <div style={{ display: "flex", width: "52px", height: "52px" }}>
          <img src={tableProps.row.original.image} />
        </div>
      ),
    },
    { Header: "Symbol", accessor: "symbol" },
    { Header: "Name", accessor: "name" },
    { Header: "Price", accessor: "current_price" },
    { Header: "Market Cap", accessor: "market_cap" },
  ];
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  const { pageIndex, pageSize } = state;
  return (
    <div className="table-container">
      <div className="table-upper-container">
        <SearchBar filter={globalFilter} setFilter={setGlobalFilter} />
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}{" "}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <tr
                  onClick={() => {
                    navigate("/" + row.original.id);
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-bottom-container">
        <div
          className="gotoButton"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </div>

        <div
          className="iterationButton"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"Previous"}
        </div>

        <span>
          Page
          {pageIndex + 1} of {pageOptions.length}
        </span>
        <div
          className="iterationButton"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </div>
        <div
          className="gotoButton"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </div>
      </div>
    </div>
  );
};

export default Table;
