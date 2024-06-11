import React, { useState } from 'react';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const Home = () => {
    const [state, setState] = useState(true); //true -> SignUp; false -> SignIn


    const buttonHandler = () => {
        setState(state => !state)
    }
    return (
        <div>
            <header>
                <button onClick={buttonHandler}>{state ? "SignIn" : "SignUp"}</button>
            </header>

            <main>
                {state ? <SignUp /> : <SignIn />}
            </main>
        </div>
    );
}

export default Home;
