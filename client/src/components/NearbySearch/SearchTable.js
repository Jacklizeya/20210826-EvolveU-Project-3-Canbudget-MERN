import React from "react"

export default function SearchTable({data}) {

    return (
        <div className="search-table">
            <table>
                <tbody>
                  <tr><th>Name</th><th>Address</th><th>Rating</th><th># of Ratings</th></tr>
                  {data.map((row) => {
                      return (                                     
                        <tr key={row.name} >
                            <td>{row.name}</td>
                            <td>{row.address}</td>
                            <td>{row.rating}</td>
                            <td>{row.ratingCount}</td>
                        </tr>
                      )
                  })}                
                </tbody>
            </table>
          </div>
    )
}