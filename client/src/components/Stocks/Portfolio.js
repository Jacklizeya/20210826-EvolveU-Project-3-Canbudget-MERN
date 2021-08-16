import { useState,useEffect } from "react";

const Portfolio = ({ portfolio }) => {
//    const Portfolio = ({ portfolioObj }) => {
        //const [portfolio, setPortfolio] = useState();

    // useEffect( () => {
    //     const portfolioChange  = async () => {
    //         setPortfolio(portfolioObj);
    //     };
    //     portfolioChange();
    // }, [portfolioObj]);

   //alert("portfolio call");
    return (
        <div class="container" >
            <div class="table-responsive">
                <h3>Portfolio</h3>
                { portfolio &&
                    <table class="table table-striped" >
                        <tr>
                            <th>Symbol</th>
                            <th>Amount</th>
                            <th>Price</th>
                            <th>Overall</th>
                        </tr>
                        {portfolio.portfolioArray.map((stock, index) => {
                            let price;
                            let sumStock;
                            if ('price' in stock) {
                                price = stock.price;
                                sumStock = price * stock.amount;
                                //sumStock = Math.round(sumStock);
                            } else {
                                price = '';
                                sumStock = '';
                            }
                            return (
                                <tr>
                                    <td>{stock.symbol} </td>
                                    <td>{stock.amount} </td>
                                    <td >{price}</td>
                                    <td>{sumStock} </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>Portfolio value:</td>
                            <td></td>
                            <td></td>
                            <td colspan="3">{(portfolio.totalSum)} </td>
                        </tr>
                        <tr>
                            <td>Account balance:</td>
                            <td></td>
                            <td></td>
                            <td colspan="3">{portfolio.balance} </td>
                        </tr>

                    </table>
                }
            </div>
        </div>
    );
}

export default Portfolio;