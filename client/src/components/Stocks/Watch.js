import { useState, useEffect } from "react";
import Plot from 'react-plotly.js';

//import Chart from 'react-apexcharts';

import { CloseButtonSmall, WatchElement, TopBottomArrow, SubmitButton, VeryLongTextTD } from "../AssetBudget/assetAndBudget.elements"
import image_close from '../../images/close.png';
import image_top from '../../images/arrortop.png';
import image_bottom from '../../images/arrowbottom.png';



const Watch = ({ stock, fullElement, company, buySellAction, closeAction,changePeriod, portfolio }) => {
    // const AlphaFunctions = ["INTRADAY", "DAILY", "WEEKLY"];
    const AlphaFunctions = ["TIME_SERIES_INTRADAY", "TIME_SERIES_DAILY", "TIME_SERIES_WEEKLY"];

    const [lastData, setLastData] = useState();
    //   const [fullData, setFullData] = useState(props.fullData);

    const [arrowBottom, setArrowBottom] = useState(true);
    const [buyAmount, setBuyAmount] = useState();
    const [sellAmount, setSellAmount] = useState();
    let per = 0;
    if (fullElement && fullElement.period) {
        per = fullElement.period
    }
    const [afunction, setAfunction] = useState(per);
    const [stockChartXValues, setStockChartXValues] = useState([]);
    const [stockChartYValues, setStockChartYValues] = useState([]);

    //console.log(company)
    useEffect(() => {
        const wachChange = async () => {
            setLastData(stock);
            setChartValues();
            if (stock && stock.close && portfolio && portfolio.portfolioArray) {
                let ca = getCurrentAmount();
                setSellAmount(ca);
                setBuyAmount(stock.close > 0 ? Math.floor((portfolio.balance / stock.close)) : 0);
            }
            setArrowBottom(true);
        };
        wachChange();
    }, [stock, fullElement]);

    function setChartValues() {
        if (!fullElement || !fullElement.data) {
            setStockChartXValues([]);
            setStockChartYValues([]);
            return
        } else {
            console.log("setChartValues -start " + stock.symbol)
            const xArray = [];
            const yArray = [];

            for (let index = fullElement.data.length - 1; index >= 0; index--) {
                xArray.push(fullElement.data[index].dateS);
                yArray.push(fullElement.data[index].close);
            }
            // for (const iterator of fullElement.data) {
            //     xArray.push(iterator.dateS);
            //     yArray.push(iterator.close);
            // }
            setStockChartXValues(xArray);
            setStockChartYValues(yArray);
            console.log("setChartValues -stop " + stock.symbol)

        }
    }


    function topBottomEvent() {
        setArrowBottom(!arrowBottom);
    }

    function buyClick() {
        //alert(buyAmount);

        if (lastData.close * buyAmount > portfolio.balance) {
            alert("You can't buy more then " + Math.floor((portfolio.balance / lastData.close)).toString() + " stocks");
            return;
        }
        topBottomEvent();
        buySellAction(true, lastData.symbol, lastData.close, buyAmount);
    }

    function getCurrentAmount() {
        if (portfolio && portfolio.portfolioArray) {
            let portfolioArrayElement = portfolio.portfolioArray.find(item => item.symbol === stock.symbol);

            if (portfolioArrayElement) {
                return portfolioArrayElement.amount;
            }
        }
        return 0;
    }

    function sellClick() {
        //alert(sellAmount.toString());
        let curAmount = getCurrentAmount()
        if (sellAmount > curAmount) {
            alert("You can't sell more then " + (curAmount).toString() + " stocks")
            return;
        }
        topBottomEvent();
        buySellAction(false, lastData.symbol, lastData.close, sellAmount);
    }

    function onClose() {
        // alert("Close "+lastData.symbol)   
        closeAction(lastData.symbol);
    }


    function Line() {
        // eslint-disable-next-line
        return (
            <div >
                {/* <Chart
                    options={{
                        chart: { type: 'line' },
                        labels: stockChartXValues,
                        xaxis: {
                            type: 'string'
                        },
                        colors: ['#4CAF50', '#3F51B5', '#FF9800', '#03A9F4']
                    }}
                    series={[{
                        name: 'Close price',
                        type: 'line',
                        data: stockChartYValues
                    }]}
                    width={680}
                /> */}
                <Plot
                    data={[
                        {
                            x: stockChartXValues,
                            y: stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'green' },
                        }
                    ]}
                    layout={{ width: 680, height: 340, title: `` }}
                />

            </div>
        )
    }


    function onChangeRadio(event) {
        setAfunction(Number(event.target.value));
        changePeriod(lastData.symbol, Number(event.target.value));
        // console.log(event.target.value)
        // console.log(fullElement.period)
        // console.log(fullElement.period === Number(event.target.value))

    }


    return (

        <WatchElement>
            <CloseButtonSmall type="image" src={image_close} className="close-button-small" onClick={onClose}></CloseButtonSmall>

            {lastData &&

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Symbol:</td>
                                            <td>{lastData.symbol}</td>
                                        </tr>
                                        <tr>
                                            <td>Date:</td>
                                            <td>{lastData.lastDate}</td>
                                        </tr>

                                        <tr>
                                            <td>Open:</td>
                                            <td>{lastData.open}</td>
                                        </tr>
                                        <tr>
                                            <td>High:</td>
                                            <td>{lastData.high}</td>
                                        </tr>
                                        <tr>
                                            <td>Low:</td>
                                            <td>{lastData.low}</td>
                                        </tr>
                                        <tr>
                                            <td>Close:</td>
                                            <td>{lastData.close}</td>
                                        </tr>
                                        <tr>
                                            <td>Volume:</td>
                                            <td>{lastData.volume}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan="2">
                                                {fullElement && <div onChange={onChangeRadio}>

                                                    {AlphaFunctions.map((func, index) => (
                                                        <div key={index} >
                                                            <label>
                                                                <input
                                                                    name={"aFunctions"+lastData.symbol} 
                                                                    type="radio"
                                                                    value={index}
                                                                    defaultChecked= {index ===afunction}
                                                                />{func}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                                }

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <Line></Line>
                            </td>
                        </tr>
                    </tbody>
                </table>

            }
            <div >
                <TopBottomArrow type="image"
                    alt=""
                    src={arrowBottom ? image_bottom : image_top}
                    className="top-bottom-arrow-button"
                    onClick={() => topBottomEvent()}>
                </TopBottomArrow>
            </div>

            {!arrowBottom &&
                <div>
                    {company &&
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{company.Name}</td>
                                </tr>

                                <tr>
                                    <td>Exchange</td>
                                    <td>{company.Exchange}</td>
                                </tr>
                                <tr>
                                    <td>County</td>
                                    <td>{company.Country}</td>
                                </tr>
                                <tr>
                                    <td>Sector</td>
                                    <td>{company.Sector}</td>
                                </tr>
                                <tr>
                                    <td>Industry</td>
                                    <td>{company.Industry}</td>
                                </tr>
                                <tr>
                                    <td>P/E Ratio</td>
                                    <td>{company.PERatio}</td>
                                </tr>
                                <tr>
                                    <td>Market Capitalization</td>
                                    <td>{company.MarketCapitalization + " " + company.Currency}</td>
                                </tr>
                                {/* <tr>
                                <td>Description</td>
                                <VeryLongTextTD>{company.Description}</VeryLongTextTD>
                            </tr> */}
                            </tbody>
                        </table>
                    }


                    {lastData &&
                        <div>
                            {lastData.close && lastData.close > 0 &&
                                <div>
                                    <label for="buyAmount">Buy Amount:</label>
                                    <input type="number"
                                        name="buyAmount"
                                        id="buyAmount"
                                        required
                                        min="0"
                                        value={buyAmount}
                                        onChange={(e) => setBuyAmount(parseInt(e.target.value))}
                                    />
                                    <SubmitButton type="button" onClick={buyClick}>Buy</SubmitButton>

                                    {(getCurrentAmount() > 0) && <div >
                                        <label for="sellAmount">Sell Amount:</label>
                                        <input type="number"
                                            name="sellAmount"
                                            id="sellAmount"
                                            required
                                            min="0"
                                            value={sellAmount}
                                            onChange={(e) => setSellAmount(parseInt(e.target.value))}
                                        />
                                        <SubmitButton type="button" onClick={sellClick}>Sell</SubmitButton>
                                    </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </WatchElement>
    )
}
export default Watch;