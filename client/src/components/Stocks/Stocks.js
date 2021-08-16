import { useEffect, useState, useContext } from "react"
import { useParams, useRouteMatch } from 'react-router-dom'

import { Heading1, PortolioDiv} from "../AssetBudget/assetAndBudget.elements"
import { PushSpinner } from "react-spinners-kit";
//import io from "socket.io-client"
import AuthenticationContext from '../auth/AuthenticationContext';
import SmartSearch from './SmartsSearch';
import Portfolio from "./Portfolio"
import Watch from "./Watch"
const Stocks = () => {
    // const socket = io();//'http://localhost:80'
    // alert("io");

    // socket.on('chat message', function (data) {
    //     console.log("Rendering message : ",data);
    //     socket.emit('chat message', "Hello brother");

    // });


    const { id } = useContext(AuthenticationContext);

    const [isPending, setIsPending] = useState();
    const [errorMessage, setError] = useState();
    const [portfolioObj, setPortfolioObj] = useState();
    const [lastData, setLastData] = useState();
    const [fullData, setFullData] = useState();
    const [companies, setCompanies] = useState();

    useEffect(() => {
        const firstTime = async () => {
            if (!id) { return; }
            await getFullData();
        }

        firstTime();
        return () => {
            closePage();
        }
    }, [])

    function closePage() {

    }

    function modifyPortfolio(buyAction, symbol, price, amount) {
        //alert(buyAction+" "+symbol)
        let t = JSON.parse(JSON.stringify(portfolioObj));
        const balanceChange = Math.round(amount * price);

        for (let i = 0; i < t.portfolioArray.length; i++) {
            if (t.portfolioArray[i].symbol === symbol) {
                if (buyAction) {
                    t.portfolioArray[i].amount += amount;
                    t.balance -= balanceChange;
                } else {
                    if (t.portfolioArray[i].amount > amount) {
                        t.portfolioArray[i].amount -= amount;
                    } else {
                        t.portfolioArray.splice(i, 1);
                    }
                    t.balance += balanceChange;
                }
                setPortfolioObj(t);
                return
            }
        }
        if (buyAction) {
            t.balance -= balanceChange;
            t.portfolioArray.push({ symbol, amount, price });
            setPortfolioObj(t);
        }
    }

    let buySellAction = async function (buyAction, symbol, price, amount) {
        //     alert(symbol + " " + price.toString() + " " + amount.toString())
        modifyPortfolio(buyAction, symbol, price, amount);
        const url = "/api/stock/" + id + "/portfolio";
        const action = { operation: (buyAction ? "buy" : "sell"), symbol, amount, price }

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            });
            if (response.ok) {
                setError(null);
                getFullData();
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }



    let closeAction = async function (symbol) {
        // alert(sumbol )
        removeWach(symbol);
        const url = "/api/stock/" + id + "/watch";
        const action = { operation: "takeAway", symbol }

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            });
            if (response.ok) {
                setError(null);
                //removeWach(symbol);
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }



    async function getFullData() {
        setIsPending(true);
        const url = "/api/stock/" + id + "/true";
        try {
            let response = await fetch(url);
            if (!response.ok) { // error coming back from server
                setError(url + " Server error 1");
                setIsPending(false);
                return;
            }

            let data = await response.json();
            if (data) {
                setCompanies(data.companies);
                setPortfolioObj(data.portfolioObj);
                setLastData(data.lastData);
                setFullData(data.fullData);
                setError("");
                setIsPending(false);
                return;
            }
            setError(" Server error 2");
            return;

        } catch (error) {
            setError(error.message);
            setIsPending(false);
            return;
        }
    }


    async function addWatch(symbol) {
        if (!symbol) {
            return;
        }
        const url = "/api/stock/" + id + "/watch";
        const action = { operation: "add", symbol, period:0 }
        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action)
            });
            // 'Accept': 'application/json'
            if (response.ok) {
                let r = await response.json();
                if (r) {
                    createWatch(symbol);
                    //alert("Data is OK")
                }
                else {
                    alert("There are no " + symbol + " stock");
                }
            } else {
                alert("response: " + await response.text());
            }

        } catch (error) {
            alert(error.message);
        }

    }


    function createWatch(symbol) {
        let t = JSON.parse(JSON.stringify(lastData));
        t.push({ symbol, amount: 0, balance: 0, lastDate: "", open: 0, high: 0, low: 0, close: 0, volume: 0, name: "", sector: "", industry: "", exchange: "" });
        setLastData(t);
        getFullData();
        return
    }

    function removeWach(symbol) {
        let t = JSON.parse(JSON.stringify(lastData));
        for (let i = 0; i < t.length; i++) {
            if (t[i].symbol === symbol) {
                //alert(i.toString()+ t[i].symbol); 
                t.splice(i, 1);
                setLastData(t);
                //alert(t[i].symbol);
                return
            }
        }
    }



    function getFullDataElement(symbol) {
        if (!fullData) {
            alert("No full data");
            return null;
        }
        return fullData.find(iterator => iterator.symbol === symbol);
    }

    function getCompanyElement(symbol) {
        if (!companies) {
            alert("No companies data");
            return null;
        }
        return companies.find(iterator => iterator.Symbol === symbol)
    }


    return (
        <div style={{maxWidth : "100%"}} >
            <Heading1>Securities</Heading1>
            <div>
                <table style={{tableLayout:"fixed", maxWidth:"100%"}}>
                    <tr>
                        <td >
                            <div>
                                {lastData && 
                                <SmartSearch lastData = {lastData} addWatch={addWatch} />
                                }
                                <hr></hr>
                                {portfolioObj &&
                                    <Portfolio portfolio={portfolioObj} />
                                }
                                {<PushSpinner size={30} color="#686769" loading={isPending} />}
                            </div>
                        </td>
                        <td>
                            <div>
                                {lastData && fullData && companies &&
                                    lastData.map((stock) => {
                                        return (
                                            <div>
                                                <Watch
                                                    stock={stock}
                                                    buySellAction={buySellAction}
                                                    closeAction={closeAction}
                                                    fullElement={getFullDataElement(stock.symbol)}
                                                    company={getCompanyElement(stock.symbol)}
                                                    portfolio = {portfolioObj}
                                                />
                                            </div>
                                        )
                                    })}
                            </div>
                        </td>
                    </tr>
                </table>

            </div>
            {errorMessage && <h3>{errorMessage}</h3>}
        </div>




    );
}

export default Stocks;