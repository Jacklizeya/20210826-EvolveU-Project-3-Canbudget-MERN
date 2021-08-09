import React, {useState, useEffect, useContext, useMemo} from 'react';
import AuthenticationContext from '../auth/AuthenticationContext';
import { useHistory } from "react-router-dom";
import axios from "axios"
import {useTable, useSortBy, useGlobalFilter, useFilters, usePagination} from "react-table"
import {SubmitButton, TransactionButton, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData, Numbertd, Tablefoot} from "./assetbudgetcomponent/assetAndBudget.elements"
import GlobalFilter from './ReactTableFilters/GlobalFilter';
import ColumnFilter from './ReactTableFilters/ColumnFilter';
import SelectFilter from './ReactTableFilters/SelectFilter';
import NumberRangeFilter from './ReactTableFilters/NumberRangeFilter';
import DateRangeColumnFilter from './ReactTableFilters/DateRangeFilter';
import TransactionChart from './assetbudgetcomponent/TransactionChart';
import Plaid from './assetbudgetcomponent/TransactionPlaid';
import Sankey from '../ApexCharts/Sankey';
import CSV from "./assetbudgetcomponent/CSV"

export default function Transactions() {
    let history = useHistory()
    const [addStatus, setAddStatus] = useState(0)
    const {id} = useContext(AuthenticationContext)
    const [transactionData, setTransactionData] = useState([])
    const data = useMemo(()=> transactionData, [transactionData])
    // console.log("transactiondata length", transactionData.length)

    const columns = useMemo(() => [
      {
        Header: 'Date',
        accessor: 'date', // accessor is the "key" in the data
        sortType: "basic",
        Filter: DateRangeColumnFilter,
        filter: "dateBetween"
      },
      {
        Header: 'merchant',
        accessor: 'name',
        sortType: "basic",
        Filter: ColumnFilter
      },{
        Header: 'Amount',
        accessor: 'amount', // accessor is the "key" in the data
        sortType: "basic",
        Filter: NumberRangeFilter,
        filter: "between"
      },
      {
        Header: 'Bankname',
        accessor: 'bankname',
        sortType: "basic",
        Filter: SelectFilter,
        filter: "includes"
      },{
        Header: 'Category',
        accessor: 'category', // accessor is the "key" in the data
        sortType: "basic",
        Filter: SelectFilter,
        filter: "includes"
      },], [])

    useEffect(() => {
        async function getUserandSetTransactionData() {
            let {data} = await axios.get(`/api/user/${id}/transaction`, )   
            setTransactionData(data)
            // console.log("user transaction", data)
        }
        console.log("enter use Effect")
        getUserandSetTransactionData()
        setAddStatus(0)
    }, [addStatus])
//  This is for the dates function
    function dateBetweenFilterFn(rows, id, filterValue) {
      let startingDate = filterValue[0];
      let endDate = filterValue[1];
      console.log(rows, id, filterValue)
          if (endDate || startingDate) {
            return rows.filter(r => {
              var time = r.values[id]
              if (endDate && startingDate) {return (time >= startingDate && time <= endDate)} 
              else if (startingDate){  return (time >= startingDate) } 
              else if (endDate){ return (time <= endDate) }
            })} else {return rows}
      // });
    }
    dateBetweenFilterFn.autoRemove = val => !val;
    const filterTypes = React.useMemo(
      () => ({
          // Add a new fuzzyTextFilterFn filter type.
          dateBetween: dateBetweenFilterFn,   /*<- LIKE THIS*/
      }),
      []
    );


    // adding sorting feature into 
    const tableInstance = useTable({columns, data, filterTypes}, useFilters, useGlobalFilter,  useSortBy, usePagination)

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
        gotoPage, // function
        pageCount,
        prepareRow,
        state,
        setGlobalFilter,
        filteredRows,
      } = tableInstance

    // by console.log(tableInstance), I discovered the result after filtering
    // console.log("filteredRows", filteredRows)

    // deconstruction state for filter 
    let {globalFilter, pageIndex} = state  

      return (
        
        transactionData? 
        <> 
         
        <Plaid id={id} setAddStatus={setAddStatus}> </Plaid>
        <CSV id={id} setAddStatus={setAddStatus}> </CSV>
        <Tablediv {...getTableProps()}>
          <GlobalFilter globalfilter={globalFilter} setFilter={setGlobalFilter}> </GlobalFilter>
          <thead>
            {// Loop over the header rows
            headerGroups.map(headerGroup => (
              // Apply the header row props
              
              <tr {...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {// Render the header, this is really something under the hood
                    column.render('Header')}
                    <tr> <span> {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                    </span> </tr>
                  </th>
                ))}
              </tr>

            ))}
          </thead>

          <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row prop
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props without sorting
                <th {...column.getHeaderProps()}>         
                  <tr> {column.canFilter ? column.render('Filter') : null} </tr>
                </th>
              ))}
            </tr>
          ))}
        </thead>
          
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
            page.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
          
          <span> Page {" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={event => gotoPage(0)} disabled={!canPreviousPage}> {"<<"} </button>
          <button onClick={event => previousPage()} disabled={!canPreviousPage}> Previous Page </button> 
          <input type="number" defaultValue={pageIndex + 1} onChange={e => {const pageNumber = e.target.value? Number(e.target.value) - 1 : 0; gotoPage(pageNumber)}}/>
          <button onClick={event => nextPage()} disabled={!canNextPage}> Next Page </button> 
          <button onClick={event => gotoPage(pageCount - 1)} disabled={!canNextPage}> {">>"} </button>
          
        </Tablediv>
        <div style={{display:'flex', flexDirection: 'row', border:'4px solid #01345B', borderRadius:'20px', margin:'20px', padding:'10px', boxShadow:'0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'}}>
          <TransactionChart data={filteredRows}/>
          <Sankey userId={id} filteredData={filteredRows}/>
        </div>
        
        </>
        : <div> Loading ...</div>
      )
     
}



