import { useTable, useSortBy, usePagination } from "react-table";
import styled, { useTheme } from "styled-components";
import {
  IoCaretDown,
  IoCaretUp,
  IoChevronBack,
  IoChevronForward
} from "react-icons/io5";
import { useEffect } from "react";

const PaginationButton = styled("button")`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ active }) =>
    active &&
    `
    font-weight: 800;
  `}
`;

const PaginationArrowButton = styled("button")`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  :disabled {
    opacity: 50%;
  }
`;

const Table = styled("table")`
  border: solid 1px #202124;
`;

const StyledTableHeaderRow = styled("tr")`
  box-sizing: border-box;
  border-bottom: solid 1px #202124;
`;

const TableRow = styled("tr")`
  cursor: pointer;
  :nth-child(even) {
    background: #ebeff2;
  }
`;

const SortIndicator = (props) => {
  const theme = useTheme();
  const { isSorted, isSortedDesc } = props.column;

  const isAsc = isSorted && !isSortedDesc;
  const isDesc = isSorted && isSortedDesc;

  return (
    <div className="p-1">
      <IoCaretUp
        style={{
          fontSize: 12,
          color: "#fff",
          marginTop: 2,
          opacity: isAsc ? 1 : 0.2
        }}
      />
      <IoCaretDown
        style={{
          fontSize: 12,
          color: "#fff",
          marginTop: -5,
          opacity: isDesc ? 1 : 0.2
        }}
      />
    </div>
  );
};

const DataList = (props) => {
  const { columns = [], data = [], onRowClick = null, pageSize = 10 } = props;
  const tableInstance = useTable(
    { columns, data, initialState: { pageSize } },
    useSortBy,
    usePagination
  );
  const {
    state: { pageIndex },
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions
  } = tableInstance;

  return (
    <div>
      <Table
        className="table-auto w-full text-left text-black whitespace-no-wrap"
        cellSpacing="0"
        cellPadding="24px"
        width="100%"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <StyledTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 ">
                  <div className="flex items-center">
                    <div className="select-none whitespace-nowrap">
                      {column.render("Header")}
                    </div>
                    <SortIndicator column={column} />
                  </div>
                </th>
              ))}
            </StyledTableHeaderRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 && (
            <TableRow>
              <td className="px-4 py-3" colSpan={columns.length} align="center">
                <span className="font-bold">No Result Found</span>
              </td>
            </TableRow>
          )}
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.cells.map((cell) => {
                  return (
                    <td className="px-4 py-3" valign="top" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      <div className="flex justify-center mt-6">
        <div className="grid grid-flow-col gap-2">
          <PaginationArrowButton
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <IoChevronBack />
          </PaginationArrowButton>
          {pageOptions.map((page) => {
            return (
              <PaginationButton
                key={`page-${page}`}
                active={pageIndex === page}
                onClick={() => {
                  gotoPage(page);
                }}
              >
                {page + 1}
              </PaginationButton>
            );
          })}
          <PaginationArrowButton
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <IoChevronForward />
          </PaginationArrowButton>
        </div>
      </div>
    </div>
  );
};

export default DataList;
