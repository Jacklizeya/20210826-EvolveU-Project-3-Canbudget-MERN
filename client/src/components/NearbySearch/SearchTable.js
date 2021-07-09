import React, {useState} from "react"
import RatingStars from "./RatingStars"

export default function SearchTable({data}) {

  const [rows, setRows] = useState(data)

    return (
        <div className="search-table">
            <table>
                <tbody>
                  <tr><th>Name</th><th>Address</th><th>Rating</th><th># of Ratings</th><th>Stars</th></tr>
                  {rows.map((row) => {
                      return (                                     
                        <tr key={row.name} >
                            <td>{row.name}</td>
                            <td>{row.address}</td>
                            <td>{row.rating}</td>
                            <td>{row.ratingCount}</td>
                            <RatingStars data={row} />
                        </tr>
                      )
                  })}                
                </tbody>
            </table>
          </div>
    )
}