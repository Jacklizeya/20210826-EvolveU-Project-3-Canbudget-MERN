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
        <div style={{border:'4px #01345b solid', borderRadius:'20px', margin:'20px', padding: '0px 20px 20px 20px', boxShadow:'0 20px 75px rgba(0, 0, 0, 0.13)'}}>
            <PortolioDiv >
                <Heading3>Portfolio</Heading3>
                { portfolio &&
                    <table style={{border:'#01345b 1px solid', borderCollapse:'collapse'}}>
                        <tbody>
                        <tr style={{color:'white', backgroundColor:'#01345b'}}>
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
                                    <td style={{border:'#01345b 1px solid'}}>{stock.symbol} </td>
                                    <td style={{border:'#01345b 1px solid'}}>{stock.amount} </td>
                                    <td style={{border:'#01345b 1px solid'}}>{price}</td>
                                    <td style={{border:'#01345b 1px solid'}}>{sumStock} </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td style={{border:'#01345b 1px solid'}}>Cash</td>
                            <td style={{border:'#01345b 1px solid', backgroundColor:'#01345b'}}></td>
                            <td style={{border:'#01345b 1px solid', backgroundColor:'#01345b'}}></td>
                            <td  style={{border:'#01345b 1px solid'}}colSpan="3">{portfolio.balance.toFixed(2)} </td>
                        </tr>
                        <tr style={{color:'white', backgroundColor:'#01345b', fontWeight:'bold'}}>
                            <td style={{border:'#01345b 1px solid'}}>Value</td>
                            <td style={{border:'#01345b 1px solid'}}></td>
                            <td style={{border:'#01345b 1px solid'}}></td>
                            <td  style={{border:'#01345b 1px solid'}}colSpan="3">{(portfolio.totalSum.toFixed(2))} </td>
                        </tr>
                        </tbody>

                    </table>
                }
            </PortolioDiv>
        </div>
    );
}

export default Portfolio;