import { useState, useEffect } from "react";


const SmartSearch = () => {
    const [searchedStock, setSearchedStock] = useState();
    const [stockList, setStockList] = useState([]);
    const [listVisible, setListVisible] = useState(false);

    function onClear() {
        setSearchedStock("");
        clearList();
    }

    function clearList() {
        setListVisible( false);
        setStockList([]);
    }

    function ShowList() {
        if (!stockList || stockList.length === 0) {
            return null;
        }
        const listItems = stockList.map((item) =>
            <li key={item._id}>
                {item.symbol + " " + item.name}
            </li>
        );
        return (
        <ul>{listItems}</ul>
    );
}

async function StartSearch(s) {
    
    setSearchedStock(s);
    s = s.trim();
    if (s.length > 0) {
        if (s.length >= 3) {
            const url = "api/stock/search/" + s;
            try {
                let response = await fetch(url);
                if (response.ok) {
                    let data = await response.json();
                    if (data) {
                        console.log(data.data)

                        setStockList(data.data);
                        setListVisible( true);
                        return;
                    }
                    alert("No Data");
                } else {
                    alert("Error");
                }

            } catch (error) {
                alert("Error ", error);
            }
        }
    }
    clearList();
}



return (
    <div>
        <h3>Search</h3>
        <div>
            <label htmlFor="searchStock">Add stock</label>
            <input
                type="text"
                name="searchStock"
                id="searchStock"
                value={searchedStock}
                className="input-field"
                onChange={(e) => StartSearch(e.target.value)}
            />
            <button type="button" class="btn-primary" onClick={onClear} >Clear</button>
        </div>
        {listVisible && ShowList()}
    </div>

);
}


export default SmartSearch;