import { useState, useEffect } from "react";

import { SubmitButton,SmartSearchList,Heading3,BoxDiv} from "../AssetBudget/assetAndBudget.elements"

const SmartSearch = ({ lastData, addWatch,  }) => {
    const [searchedStock, setSearchedStock] = useState();
    const [stockList, setStockList] = useState([]);
    const [listVisible, setListVisible] = useState(false);

    function onClear() {
        setSearchedStock("");
        clearList();
    }

    function clearList() {
        setListVisible(false);
        setStockList([]);
    }

    function StockLineButton({ symbol, name }) {
        // const backgroundColor = name === nameOfSelectedWidget ? 'lightBlue' : 'grey'
        // style={{ border: '1px solid blue', padding: 20, width: 100, height: 25, margin: 25, 'lightBlue'}}
        return <SmartSearchList 
            onClick={() => { setNewStock(symbol) }}>
            {symbol + "  " + name}
        </SmartSearchList>
    }

    function setNewStock(symbol) {
        if (lastData.find(item => item.symbol===symbol)) {
            return
        }
        clearList();
        setSearchedStock("");
        addWatch(symbol);
    }

    //     function ShowList() {
    //         if (!stockList || stockList.length === 0) {
    //             return null;
    //         }
    //         const listItems = stockList.map((item) =>
    //             <li key={item._id}>
    //                 {item.symbol + " " + item.name}
    //             </li>
    //         );
    //         return (
    //         <ul>{listItems}</ul>
    //     );
    // }


    function ShowList() {
        if (!stockList || stockList.length === 0) {
            return null;
        }
        return (
        <div>
            {stockList.map((item) =>
                <StockLineButton symbol={item.symbol} name={item.name} />
            )}
        </div>
        // const listItems = stockList.map((item) =>
        //     <li key={item._id}>
        //         {item.symbol + " " + item.name}
        //     </li>
        // );
        // return (
        //     <ul>{listItems}</ul>
        // );
            )
        }

        async function StartSearch(s) {
            setSearchedStock(s);
            s = s.trim();
            if (s.length > 0) {
                if (s.length >=2) {
                    const url = "api/stock/search/" + s;
                    try {
                        let response = await fetch(url);
                        if (response.ok) {
                            let data = await response.json();
                            if (data) {
                                //console.log(data.data)

                                setStockList(data.data);
                                setListVisible(true);
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
            <div 
                style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border:'4px #01345b solid', 
                    borderRadius:'20px', 
                    margin:'20px', 
                    padding: '20px', 
                    boxShadow:'0 20px 75px rgba(0, 0, 0, 0.13)'
                }}
            >
                    <div style={{display:'flex'}}>
                        <Heading3>Search for Securities</Heading3>
                        {/* <label htmlFor="searchStock">Add stock</label> */}
                        <input
                            type="text"
                            name="searchStock"
                            id="searchStock"
                            value={searchedStock}
                            className="input-field"
                            onChange={(e) => StartSearch(e.target.value)}
                        />
                        <SubmitButton type="button"  onClick={onClear}>Clear</SubmitButton>
                    </div>
                {listVisible && ShowList()}
            </div>
        );
    }


    export default SmartSearch;