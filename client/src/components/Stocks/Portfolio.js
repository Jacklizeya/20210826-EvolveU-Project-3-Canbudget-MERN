import { useState,useEffect } from "react";
import { Heading3,PortolioDiv} from "../AssetBudget/assetAndBudget.elements"
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
        <div >
            <PortolioDiv >
                <Heading3>Portfolio:</Heading3>
                { portfolio &&
                    <table >
                        <tbody>
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
                                sumStock = (price * stock.amount).toFixed(2);
                                //sumStock = Math.round(sumStock);
                            } else {
                                price = '';
                                sumStock = '';
                            }
                            return (
                                <tr key ={stock.symbol}>
                                    <td>{stock.symbol} </td>
                                    <td>{stock.amount} </td>
                                    <td>{price}</td>
                                    <td>{sumStock} </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>Portfolio value:</td>
                            <td></td>
                            <td></td>
                            <td colSpan="3">{(portfolio.totalSum.toFixed(2))} </td>
                        </tr>
                        <tr>
                            <td>Account balance:</td>
                            <td></td>
                            <td></td>
                            <td colSpan="3">{portfolio.balance.toFixed(2)} </td>
                        </tr>
                        </tbody>

                    </table>
                }
            </PortolioDiv>
        </div>
    );
}

export default Portfolio;