import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {

    const [searchSymbol, setSearchSymbol] = useState('');
    const [stockName, setStockName] = useState();
    const [stockPrice, setStockPrice] = useState();

    const [buyValue, setBuyValue] = useState('');

    const updateSearchSymbol = async (ev) => {
        setSearchSymbol(ev.currentTarget.value)
    };

    const searchStock = async () => {
        console.log('This is where we make an API call to the backend to fetch the price and other information about the stock')
        console.log('Once the information comes back from the backend API, display it on the UI')
        console.log('the user typed in this symbol', searchSymbol)
        let res = await fetch(`http://localhost:3000/api/search/${searchSymbol}`)
        // let res = await fetch(`https://calm-meadow-20175.herokuapp.com/api/search/${searchSymbol}`)
        res = await res.json()
        setStockName(searchSymbol)
        setStockPrice(res.data.price)
        setSearchSymbol('')
        console.log('res returned back from the backend API is', res)
    };

    const buyStock = async () => {
        let res = await fetch('http://localhost:3000/api/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({buyValue, stockName, stockPrice})
        })

    };


  return (
    <div>

        <div className={'grid grid-cols-12'}>

            <div className={'col-span-12 bg-gray-200 h-16 p-3 border-b-4 border-black'}>
                <h1 className={'text-4xl font-semibold text-center'}>Paper Trader</h1>
            </div>

            <div className={'col-span-7 h-96 p-3 border-r-4 border-b border-black'}>

                <div className={'flex gap-12'}>
                    <input type="search"
                           className={'border w-1/2 p-2 border-gray-400 rounded-full'}
                           value={searchSymbol}
                           onChange={updateSearchSymbol}
                           placeholder={'Search...'}/>

                    <button onClick={searchStock} className={'px-4 py-1 bg-gray-600 text-white font-semibold text-lg rounded'}>Search</button>
                </div>


                {stockName && <div className={'flex mt-8 ml-2 gap-24 justify-start'}>
                    <h1 className={'text-3xl'}>{stockName}</h1>
                    <h2 className={'text-sm'}>${stockPrice}</h2>

                    <input type="text" value={buyValue} onChange={(event) => setBuyValue(event.currentTarget.value)} className={'border'}/>
                    {buyValue}

                    <button onClick={buyStock} className={'px-8 py-2 bg-blue-600 text-white font-semibold text-xl rounded'}>Buy</button>

                </div>}



            </div>

            <div className={'col-span-5 bg-gray-600 h-96 p-3'}>
                Box 2
            </div>

        </div>


    </div>
  );
}

export default App;
